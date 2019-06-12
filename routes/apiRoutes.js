var db = require("../models");

module.exports = function(app) {
  // Get all cards for a particular category.
  app.get("/api/cards/:category", function(req, res) {
    db.Card.findAll({where: { category: req.params.category }}).then(function(dbReturn) {
      res.json(dbReturn);
      console.log(dbReturn)
    });
  });
  // where: { category: req.params.category }

  // Create a new example
  app.post("/api/cards", function(req, res) {
    db.Card.create(req.body).then(function(dbReturn) {
      res.json(dbReturn);
    });
  });

  // Delete an example by id
  // app.delete("/api/cards/:card_id", function(req, res) {
  //   db.Card.destroy({ where: { card_id: req.params.card_id } }).then(function(dbReturn) {
  //     res.json(dbReturn);
  //   });
  // });
};
