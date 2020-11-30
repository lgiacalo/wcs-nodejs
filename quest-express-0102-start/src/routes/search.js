const { query, validationResult } = require("express-validator");
const connection = require("../../config");
const express = require("express");

const router = express.Router();

router.get("/", query("maxDuration").isNumeric(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const duration = Number(req.query.maxDuration);

  connection.query(
    "SELECT * FROM movies WHERE duration <= ?",
    [duration],
    (err, results) => {
      if (err) res.status(500).json({ error: err.message, sql: err.sql });
      else if (!results.length)
        res.status(404).send("No movie found for this duration");
      else res.status(200).json(results.length === 1 ? results[0] : results);
    }
  );
});

module.exports = router;
