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

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  executeQuery("SELECT * FROM users WHERE id = ?", [id], res);
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

  db.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection error:", err);
      return res.status(500).json({ error: "Database connection error" });
    }

    connection.query(sql, [
      username,
      phoneNumber,
      firstName,
      middleName,
      lastName,
      suffix,
      email,
      password,
    ], (queryErr, result) => {
      connection.release();

      if (queryErr) {
        console.error("Database query error:", queryErr);
        return res.status(500).json({ error: "Database query error" });
      }

      res.json({
        message: "User registered successfully",
        userId: result.insertId
      });
    });
  });
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

app.put("/products/stocks/:id", (req, res) => {
  const { stocks } = req.body;
  const { id } = req.params;
  const sql = "UPDATE products SET stocks = ? WHERE id = ?";
  executeQuery(sql, [stocks, id], res);
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id = ?";
  executeQuery(sql, [id], res);
});

// ------------------ CART ITEM ROUTES ------------------- //

app.get("/cart-items", (req, res) => {
  executeQuery("SELECT C.id, C.client_id, P.name as product_name, P.image_link as image_link, C.product_id, C.quantity, C.unit_price, C.created_at FROM cart_items C LEFT JOIN products P ON C.product_id = P.id", [], res);
});

app.get("/cart-items/:client_id", (req, res) => {
  const { client_id } = req.params;
  const sql = "SELECT C.id, C.client_id, P.name as product_name, P.image_link as image_link, C.product_id, C.quantity, C.unit_price, C.created_at FROM cart_items C LEFT JOIN products P ON C.product_id = P.id WHERE C.client_id = ?";
  executeQuery(sql, [client_id], res);
});

app.post("/cart-items", (req, res) => {
  const { client_id, product_id, quantity, unit_price } = req.body;
  const sql =
    "INSERT INTO cart_items (client_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)";
  executeQuery(sql, [client_id, product_id, quantity, unit_price], res);
});

app.delete("/cart-items/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cart_items WHERE id = ?";
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
  const { client_id, total_amount, order_details } = req.body;

  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool:", err);
      return res.status(500).json({ error: "Database connection error" });
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return res.status(500).json({ error: "Error starting transaction" });
      }

      // Insert order
      const orderSql = "INSERT INTO orders (client_id, total_amount) VALUES (?, ?)";
      connection.query(orderSql, [client_id, total_amount], (err, orderResult) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
            res.status(500).json({ error: "Error creating order" });
          });
        }

        const orderId = orderResult.insertId;

        // Insert order details
        const detailsSql =
          "INSERT INTO order_details (order_id, product_id, product_quantity, unit_price, sub_total) VALUES ?";
        const detailsValues = order_details.map((detail) => [
          orderId,
          detail.product_id,
          detail.product_quantity,
          detail.unit_price,
          detail.sub_total,
        ]);

        connection.query(detailsSql, [detailsValues], (err) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              res.status(500).json({ error: "Error creating order details" });
            });
          }

          // Update product stocks
          const updateStockSql = `
            UPDATE products 
            SET stocks = stocks - ? 
            WHERE id = ?`;

          // Reduce stock for each product in the order
          const stockUpdates = order_details.map((detail) => {
            return new Promise((resolve, reject) => {
              connection.query(updateStockSql, [detail.product_quantity, detail.product_id], (err) => {
                if (err) reject(err);
                else resolve();
              });
            });
          });

          // Execute stock updates
          Promise.all(stockUpdates)
            .then(() => {
              // Delete items from cart after successful order
              const deleteCartSql = "DELETE FROM cart_items WHERE client_id = ?";
              connection.query(deleteCartSql, [client_id], (err) => {
                if (err) {
                  return connection.rollback(() => {
                    connection.release();
                    res.status(500).json({ error: "Error deleting cart items" });
                  });
                }

                // Commit transaction
                connection.commit((err) => {
                  if (err) {
                    return connection.rollback(() => {
                      connection.release();
                      res.status(500).json({ error: "Error committing transaction" });
                    });
                  }

                  connection.release();
                  res.status(200).json({
                    message: "Order created successfully",
                    orderId: orderId,
                  });
                });
              });
            })
            .catch((err) => {
              return connection.rollback(() => {
                connection.release();
                res.status(500).json({ error: "Error updating product stocks" });
              });
            });
        });
      });
    });
  });
});

// Get orders that are not delivered
app.get("/pending-order/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT O.id as order_id, O.client_id as client_id, O.total_amount, O.status as order_status, O.created_at as order_date, OD.product_id, OD.product_quantity as quantity, OD.unit_price, OD.sub_total as sub_total, P.name as product_name, P.image_link as image_link FROM orders O JOIN order_details OD ON O.id = OD.order_id JOIN products P ON OD.product_id = P.id WHERE O.status != 'Delivered' AND O.client_id = ?";
  executeQuery(sql, [id], res);
});

app.get("/orders", (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection error:", err);
      return res.status(500).json({ error: "Database connection error" });
    }

    // First, get all unique orders
    const ordersSql = `
      SELECT DISTINCT 
        O.id as orderId,
        O.total_amount as totalAmount,
        O.created_at as timestamp,
        O.status,
        U.first_name,
        U.last_name,
        U.address
      FROM orders O
      JOIN users U ON O.client_id = U.id
      ORDER BY O.created_at DESC
    `;

    connection.query(ordersSql, (err, orders) => {
      if (err) {
        connection.release();
        return res.status(500).json({ error: "Error fetching orders" });
      }

      // Then, get all order details for these orders
      const detailsSql = `
        SELECT 
          OD.order_id,
          P.name,
          P.image_link as image,
          P.category_id as category,
          OD.product_quantity as quantity
        FROM order_details OD
        JOIN products P ON OD.product_id = P.id
      `;

      connection.query(detailsSql, (err, details) => {
        connection.release();
        if (err) {
          return res.status(500).json({ error: "Error fetching order details" });
        }

        // Format the response to match the frontend structure
        const formattedOrders = orders.map(order => ({
          orderId: order.orderId,
          totalAmount: order.totalAmount,
          items: details
            .filter(detail => detail.order_id === order.orderId)
            .map(detail => ({
              name: detail.name,
              quantity: detail.quantity,
              category: detail.category,
              image: detail.image
            })),
          timestamp: order.timestamp,
          address: order.address,
          customerName: `${order.first_name} ${order.last_name}`,
          status: order.status
        }));

        res.json(formattedOrders);
      });
    });
  });
});

app.get("/order-details", (req, res) => {
  const sql = "SELECT * FROM order_details";
  executeQuery(sql, [], res);
});

app.delete("/orders/:id", (req, res) => {
  const { id } = req.params;

  db.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection error:", err);
      return res.status(500).json({ error: "Database connection error" });
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return res.status(500).json({ error: "Error starting transaction" });
      }

      // First delete order details
      const deleteDetailsSql = "DELETE FROM order_details WHERE order_id = ?";
      connection.query(deleteDetailsSql, [id], (err) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
            res.status(500).json({ error: "Error deleting order details" });
          });
        }

        // Then delete the order
        const deleteOrderSql = "DELETE FROM orders WHERE id = ?";
        connection.query(deleteOrderSql, [id], (err) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              res.status(500).json({ error: "Error deleting order" });
            });
          }

          // Commit the transaction
          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                res.status(500).json({ error: "Error committing transaction" });
              });
            }

            connection.release();
            res.json({ message: "Order deleted successfully" });
          });
        });
      });
    });
  });
});

app.put("/set-order-status/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = "UPDATE orders SET status = ? WHERE id = ?";
  executeQuery(sql, [status, id], res);
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
