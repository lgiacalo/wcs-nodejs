const express = require("express");
const { body, validationResult, matchedData } = require("express-validator");
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

// USERS ==> POST
app.post(
  "/api/users",
  [
    body("firstname").isLength({ min: 3 }),
    body("lastname").isLength({ min: 3 }),
    body("email").isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const data = matchedData(req);
    connection.query("INSERT INTO users SET ?", data, (err, results) => {
      if (err)
        return res.status(500).json({ error: err.message, sql: err.sql });

      connection.query(
        "SELECT * FROM users WHERE id = ?",
        results.insertId,
        (err2, records) => {
          if (err2)
            return res.status(500).json({ error: err2.message, sql: err2.sql });

          const user = records[0];
          const host = req.get("host");
          const location = `http://${host}/${req.url}/${user.id}`;

          return res.status(201).set("Location", location).json(user);
        }
      );
    });
  }
);

// MOVIES
app.get("/api/movies", (req, res) => {
  connection.query("SELECT * FROM movie", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la recuperation des films");
    } else {
      res.json(results);
    }
  });
});

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

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
