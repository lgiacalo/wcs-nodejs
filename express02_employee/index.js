const express = require("express");
const connection = require("./conf");

const app = express();
const port = 3000;

app.get("/api/employees", (req, res) => {
  // TODO récupération des données (étape 2)
  connection.query("SELECT * from employee", (err, results) => {
    // TODO envoyer les données récupérées (étape 3)
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la récupération des employés");
    } else {
      res.json(results);
    }
  });
});

app.get("/api/movies", (req, res) => {
  connection.query("SELECT * FROM movie", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la recuperation des films");
    } else {
      res.json(results);
    }
  });
});

app.get("/api/movies/names", (req, res) => {
  connection.query("SELECT name FROM movie", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la recuperation des noms de films");
    } else {
      res.json(results);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
