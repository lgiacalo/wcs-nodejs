const express = require("express");
const connection = require("../../config");

const router = express.Router();

router.get("/", (req, res) => {
  connection.query("SELECT * FROM movies", (err, results) => {
    if (err) return res.status(500).json({ error: err.message, sql: err.sql });
    res.status(200).json(results);
  });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  connection.query("SELECT * FROM movies WHERE id=?", [id], (err, results) => {
    if (err) res.status(500).json({ error: err.message, sql: err.sql });
    else if (!results.length) res.status(404).send("Movie not found");
    else res.status(200).send(results[0]);
  });
});

module.exports = router;
