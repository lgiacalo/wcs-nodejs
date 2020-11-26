const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hey ! It's a GET");
});

router.post('/', (req, res) => {
  res.send("Hey ! It's a POST");
})

// PUT
router.put('/:name([a-zA-Z]+)', (req, res) => {
  res.send("Hey my name is " + req.params.name);
})

router.get('/:id([0-9]+)', (req, res) => {
  res.send("Hey ! It's a GET with ID " + req.params.id);
});

// DELETE
router.delete('/:id([0-9]+)', (req, res) => {
  res.send("Hey it's a DELETE ID " + req.params.id);
})

module.exports = router;

// '/:id([0-9]+)'
// '/:name([a-zA-Z]+)'