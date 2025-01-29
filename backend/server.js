require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // Your Gmail address
    pass: process.env.EMAIL_APP_PASSWORD  // Your Gmail app password
  }
});

// Store verification codes temporarily (in memory)
const verificationCodes = new Map();

app.get("/", (req, res) => {
  return res.json("From Backend Side");
});

// GET route for all users
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// GET route for all categories
app.get("/product-categories", (req, res) => {
  const sql = "SELECT * FROM product_categories";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// GET route for all products
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// POST route for adding a product
app.post("/products", (req, res) => {
  const { name, sku, price, stocks, category_id, measurement, image_link, barcode } = req.body;
  const sql = "INSERT INTO products (name, sku, price, stocks, category_id, measurement, image_link, barcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, sku, price, stocks, category_id, measurement, image_link, barcode], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// POST route to add a user
app.post("/users", (req, res) => {
  const { 
    username,
    phoneNumber,
    firstName,
    middleName,
    lastName,
    suffix,
    email,
    password
  } = req.body;

  const sql = `INSERT INTO users 
    (username, phone_number, first_name, middle_name, last_name, suffix, email_address, password) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    username,
    phoneNumber,
    firstName,
    middleName,
    lastName,
    suffix,
    email,
    password  // Note: In production, this should be hashed!
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    return res.status(201).json({ 
      message: "User registered successfully", 
      userId: result.insertId 
    });
  });
});

// Send verification code route
app.post("/api/send-verification", async (req, res) => {
  const { email, code } = req.body;
  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Email Verification Code',
      text: `Your verification code is: ${code}\nThis code will expire in 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Email Verification</h2>
          <p>Your verification code is:</p>
          <h1 style="color: #E39E05; font-size: 32px;">${code}</h1>
          <p>This code will expire in 5 minutes.</p>
        </div>
      `
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send verification code' });
  }
});

// Verify user and update database
app.post("/api/verify-user", async (req, res) => {
  const { userId, email } = req.body;

  try {
    const sql = "UPDATE users SET is_verified = true WHERE id = ? AND email_address = ?";
    db.query(sql, [userId, email], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, error: 'Database error' });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      
      res.json({ success: true });
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ success: false, error: 'Verification failed' });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Listening");
});
