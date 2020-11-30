const express = require("express");
const movies = require("./movies");
const search = require("./search");

const router = express.Router();

router.use("/movies", movies);
router.use("/search", search);

router.get("/user", (req, res) => {
  res.status(401).send("Unauthorized");
});

module.exports = router;
