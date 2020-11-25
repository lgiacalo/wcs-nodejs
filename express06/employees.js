const express = require("express");
const connection = require("./conf");

const app = express();
const port = 3000;

// EMPLOYEES ///////////////////////////////////////////////////////////////////////////////
app.get("/api/employees", (req, res) => {
  let sql = "SELECT * FROM employee WHERE 1 = 1";
  const sqlValues = [];

  if (req.query.department) {
    sql += " AND department = ?";
    sqlValues.push(req.query.department);
  }

  connection.query(sql, sqlValues, (err, results) => {
    if (err) {
      res.status(500).send(`An error occurred: ${err.message}`);
    } else {
      res.json(results);
    }
  });
});

app.get("/api/employees/:id", (req, res) => {
  const id = req.params?.id;

  connection.query(
    "SELECT * FROM employee WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(`An error occurred: ${err.message}`);
      } else if (!results.length) {
        res.status(404).send("Employee not found");
      } else {
        res.json(results[0]);
      }
    }
  );
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
