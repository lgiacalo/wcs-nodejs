const express = require("express");
const connection = require("../config");
const api = require("./routes");

const app = express();

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/", (req, res) => {
  res.send("Welcome to my favourite movie list");
});

app.use("/api", api);

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw new Error("Something bad happened");
  }
  console.log(`Server is listening on ${process.env.PORT}`);
});
