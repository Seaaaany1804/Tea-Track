require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.get("/", (req, res) => {
  return res.json("From Backend Side");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM USERS";
  db.query(sql, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
});

app.listen(process.env.PORT, () => {
  console.log("Listening");
});
