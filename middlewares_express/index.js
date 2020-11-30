const express = require("express");

const port = 3000;
const app = express();

app.get(
  "/superMiddleware",
  (req, res, next) => {
    console.log("hello middleware");
    next();
  },
  (req, res) => {
    res.send("hello world");
  }
);

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
