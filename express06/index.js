const express = require("express");
const { connect } = require("./conf");
const connection = require("./conf");

const app = express();
const port = 3000;

// MOVIES ///////////////////////////////////////////////////////////////////////////////
app.get("/api/movies", (req, res) => {
  let sql = "SELECT * FROM movie WHERE 1 = 1 ";
  const sqlValues = [];

  if (req.query.rating) {
    sql += "AND rating = ?";
    sqlValues.push(req.query.rating);
  }

  if (req.query.genre) {
    sql += "AND genre = ?";
    sqlValues.push(req.query.genre);
  }

  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      console.log("err :>> ", err);
      res.status(500).send(`An error occurred: ${err.message}`);
    } else {
      res.json(results);
    }
  });
});

app.get("/api/movies/:id", (req, res) => {
  const id = req.params?.id;

  connection.query("SELECT * FROM movie WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log("err :>> ", err);
      res.status(500).send(`An error occurred: ${err.message}`);
    } else if (!results.length) {
      res.status(404).send("Movie not found");
    } else {
      res.json(results[0]);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
