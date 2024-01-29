var express = require("express");
var router = express.Router();
require("../models/connection");
const Place = require("../models/places");

// POST /places : ajout d’un marqueur en base de données (via req.body)

router.post("/", (req, res) => {
  const newPlace = new Place({
    nickname: req.body.nickname,
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });
  newPlace.save().then(() => {
    res.json({ result: true });
  });
});

// GET /places/:nickname : récupération de tous les marqueurs d’un utilisateur en fonction de son surnom (via req.params)

router.get("/:nickname", (req, res) => {
  Place.find({ nickname: req.params.nickname }).then((data) => {
    res.json({ result: true, places: data });
  });
});

// DELETE /places : suppression d’un marqueur à partir de son nom et du surnom de l’utilisateur (via req.body)

router.delete("/", (req, res) => {
  Place.deleteOne({ nickname: req.body.nickname, name: req.body.name }).then(
    () => res.json({ result: true })
  );
});

module.exports = router;
