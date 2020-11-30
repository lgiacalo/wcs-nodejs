const { query, checkSchema, validationResult } = require("express-validator");
const connection = require("../../config");
const express = require("express");

const router = express.Router();

const schema_color = {
  color: {
    in: "query",
    optional: { options: { checkFalsy: true } },
    matches: {
      options: [/\b(?:false|true)\b/],
      errorMessage: "Error value from color (true/false)",
    },
  },
};

router.get(
  "/",
  [query("maxDuration").optional().isNumeric(), checkSchema(schema_color)],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const duration = Number(req.query.maxDuration);
    const color = req.query.color;

    let sql = "SELECT * FROM movies WHERE 1=1";
    const sqlValues = [];
    if (duration) {
      sql += " AND duration <= ?";
      sqlValues.push(duration);
    }

    if (color) {
      sql += " AND color = ?";
      sqlValues.push(color === "true" ? 1 : 0);
    }

    connection.query(sql, sqlValues, (err, results) => {
      if (err) res.status(500).json({ error: err.message, sql: err.sql });
      else res.status(200).json(results.length === 1 ? results[0] : results);
    });
  }
);

module.exports = router;
