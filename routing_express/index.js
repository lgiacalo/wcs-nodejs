const express = require("express");
const users = require("./routes/users");

const app = express();
const port = 8000;

app.use("/users", users);

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`Server is listening on ${port}`);
});
