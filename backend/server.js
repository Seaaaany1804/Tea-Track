require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.get("/", (req, res) => {
  return res.json("From Backend Side");
});

// GET all users
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM USERS";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// POST route to add a user
app.post("/users", (req, res) => {
  const { 
    username, 
    first_name, 
    middle_name, 
    last_name, 
    email_address, 
    password, 
    phone_number, 
    user_type 
  } = req.body;

  const sql = `INSERT INTO users 
    (username, first_name, middle_name, last_name, email_address, password, phone_number, user_type) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    username,
    first_name,
    middle_name,
    last_name,
    email_address,
    password,
    phone_number,
    user_type,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ message: "User added successfully", userId: result.id });
  });
});

app.listen(process.env.PORT, () => {
  console.log("Listening");
});
