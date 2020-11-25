const express = require("express");
const connection = require("./conf");

const app = express();
const port = 3000;

// Support JSON-encoded bodies
app.use(express.json());
// Support URL-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
);

// MOVIES GET
app.get("/api/movies", (req, res) => {
  connection.query("SELECT * FROM movie", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la recuperation des films");
    } else {
      res.json(results);
    }
  });
});

// MOVIES POST
// | id | name  | poster    | comment
app.post("/api/movies", (req, res) => {
  const formData = req.body;
  if (!formData.name || !formData.poster || !formData.comment) {
    res.status(400).send("Erreur dans le body");
  }

  connection.query("INSERT INTO movie SET ?", formData, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la sauvegarde d'un film");
    } else {
      res.sendStatus(200);
    }
  });
});

// MOVIES PUT
app.put("/api/movies/:id", (req, res) => {
  const idFilm = req.params.id;
  const formData = req.body;

  connection.query(
    "UPDATE movie SET ? WHERE id = ?",
    [formData, idFilm],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un film");
      } else {
        res.sendStatus(200);
      }
    }
  );
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

// EMPLOYEES
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

app.post("/api/employees", (req, res) => {
  // Données stockées dans req.body
  const formData = req.body;
  console.log(formData);
  // connexion à la base de données, et insertion de l'employé
  connection.query("INSERT INTO employee SET ?", formData, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un employé");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

// écoute de l'url "/api/employees"
app.put("/api/employees", (req, res) => {
  // récupération des données envoyées
  const formData = req.body;

  // connection à la base de données, et insertion de l'employé
  connection.query(
    "UPDATE employee SET ? WHERE id = ?",
    [formData, formData.id],
    (err) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un employé");
      } else {
        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200);
      }
    }
  );
});

// écoute de l'url "/api/employees"
app.put("/api/employees/:id", (req, res) => {
  // récupération des données envoyées
  const idEmployee = req.params.id;
  const formData = req.body;

  // connection à la base de données, et insertion de l'employé
  connection.query(
    "UPDATE employee SET ? WHERE id = ?",
    [formData, idEmployee],
    (err) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un employé");
      } else {
        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200);
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
