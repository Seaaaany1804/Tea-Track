require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use a connection pool to manage MySQL connections automatically
const db = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

app.get("/", (req, res) => {
  return res.json("From Backend Side");
});

// Helper function to execute queries safely
const executeQuery = (sql, values, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection error:", err);
      return res.status(500).json({ error: "Database connection error" });
    }

    connection.query(sql, values, (queryErr, data) => {
      connection.release(); // Release the connection back to the pool

      if (queryErr) {
        console.error("Database query error:", queryErr);
        return res.status(500).json({ error: "Database query error" });
      }

      res.json(data);
    });
  });
};

// ------------------ USERS ROUTES ------------------- //

app.get("/users", (req, res) => {
  executeQuery("SELECT * FROM users", [], res);
});

app.post("/users", (req, res) => {
  const {
    username,
    phoneNumber,
    firstName,
    middleName,
    lastName,
    suffix,
    email,
    password,
  } = req.body;

  const sql = `INSERT INTO users 
    (username, phone_number, first_name, middle_name, last_name, suffix, email_address, password) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  executeQuery(
    sql,
    [
      username,
      phoneNumber,
      firstName,
      middleName,
      lastName,
      suffix,
      email,
      password,
    ],
    res
  );
});

// ------------------ PRODUCT CATEGORIES ROUTES ------------------- //

app.get("/product-categories", (req, res) => {
  executeQuery("SELECT * FROM product_categories", [], res);
});

// ------------------ PRODUCTS ROUTES ------------------- //

app.get("/products", (req, res) => {
  executeQuery("SELECT * FROM products", [], res);
});

app.post("/products", (req, res) => {
  const {
    name,
    sku,
    price,
    stocks,
    category_id,
    measurement,
    image_link,
    barcode,
  } = req.body;
  const sql =
    "INSERT INTO products (name, sku, price, stocks, category_id, measurement, image_link, barcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  executeQuery(
    sql,
    [name, sku, price, stocks, category_id, measurement, image_link, barcode],
    res
  );
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, sku, price, stocks, measurement, image_link, barcode } =
    req.body;
  const sql =
    "UPDATE products SET name = ?, sku = ?, price = ?, stocks = ?, measurement = ?, image_link = ?, barcode = ? WHERE id = ?";
  executeQuery(
    sql,
    [name, sku, price, stocks, measurement, image_link, barcode, id],
    res
  );
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id = ?";
  executeQuery(sql, [id], res);
});

// ------------------ LOGS ROUTES ------------------- //

app.get("/logs", (req, res) => {
  executeQuery("SELECT * FROM logs", [], res);
});

app.post("/logs", (req, res) => {
  const { description, action } = req.body;
  const sql = "INSERT INTO logs (description, action) VALUES (?, ?)";
  executeQuery(sql, [description, action], res);
});

// ------------------ ORDERS ROUTES ------------------- //

app.post("/orders", (req, res) => {
  const { client_id, email_address, total_amount, order_details } = req.body;

  // Get a connection from the pool
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection error:", err);
      return res.status(500).json({ error: "Database connection error" });
    }

    // Begin transaction
    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return res.status(500).json({ error: "Transaction error" });
      }

      // First, insert the order
      const orderSql =
        "INSERT INTO orders (client_id, email_address, total_amount) VALUES (?, ?, ?)";
      connection.query(
        orderSql,
        [client_id, email_address, total_amount],
        (err, orderResult) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              res.status(500).json({ error: "Error creating order" });
            });
          }

          const orderId = orderResult.insertId;

          // Prepare order details queries
          const detailsSql =
            "INSERT INTO order_details (order_id, product_id, product_quantity, unit_price, sub_total) VALUES ?";
          const detailsValues = order_details.map((detail) => [
            orderId,
            detail.product_id,
            detail.product_quantity,
            detail.unit_price,
            detail.product_quantity * detail.unit_price, // Calculate sub_total
          ]);

          // Insert order details
          connection.query(detailsSql, [detailsValues], (err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                res.status(500).json({ error: "Error creating order details" });
              });
            }

            // Commit transaction
            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  res
                    .status(500)
                    .json({ error: "Error committing transaction" });
                });
              }

              connection.release();
              res.json({
                message: "Order created successfully",
                orderId: orderId,
              });
            });
          });
        }
      );
    });
  });
});

// Get orders that are not delivered
app.get("/pending-order", (req, res) => {
  const sql = "SELECT * FROM orders WHERE status != 'Delivered'";
  executeQuery(sql, [], res);
});

app.get("/order-details/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM order_details WHERE order_id = ?";
  executeQuery(sql, [id], res);
});

// ------------------ EMAIL VERIFICATION ------------------- //

app.post("/api/send-verification", async (req, res) => {
  const { email, code } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Email Verification Code",
      text: `Your verification code is: ${code}\nThis code will expire in 5 minutes.`,
      html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
               <h2>Email Verification</h2>
               <p>Your verification code is:</p>
               <h1 style="color: #E39E05; font-size: 32px;">${code}</h1>
               <p>This code will expire in 5 minutes.</p>
             </div>`,
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send verification code" });
  }
});

app.post("/api/verify-user", async (req, res) => {
  const { userId, email } = req.body;
  const sql =
    "UPDATE users SET is_verified = true WHERE id = ? AND email_address = ?";

  executeQuery(sql, [userId, email], res);
});

app.listen(process.env.PORT, () => {
  console.log("Listening");
});
