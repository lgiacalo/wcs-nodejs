const express = require("express");
const app = express();
const port = 3000;

app.get("/", (request, response) => {
  response.send("Bienvenue sur Express");
});

app.get("/api/movies", (req, res) => {
  res.send("Récupération de tous les films");
});

app.get("/api/movies/:id", (req, res) => {
  res.send(req.params);
});

app.get("/api/employee", (req, res) => {
  if (req.query?.name)
    res.status(404).send(`Impossible de récupérer l'employé ${req.query.name}`);
  else res.sendStatus(304);
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
