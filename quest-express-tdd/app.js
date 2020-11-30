// app.js
const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();
const connection = require("./connection");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.post("/bookmarks", (req, res) => {
  const { title, url } = req.body;

  if (!url | !title)
    return res.status(422).json({ error: "required field(s) missing" });

  connection.query(
    "INSERT INTO bookmark SET ?",
    { title, url },
    (err, results) => {
      if (err) return res.send(500).json({ error: err.message, sql: err.sql });

      connection.query(
        "SELECT * FROM bookmark WHERE id = ?",
        [results.insertId],
        (err2, record) => {
          if (err2)
            return res.status(500).json({ error: err2.message, sql: err2.sql });
          res.status(201).json(record[0]);
        }
      );
    }
  );
});

module.exports = app;
