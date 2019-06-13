var db = require("../models");

module.exports = function(app) {
  // Get all cards for a particular category.
  app.get("/api/cards/:category", function(req, res) {
    db.Card.findAll({where: { category: req.params.category }}).then(function(dbReturn) {
      let cardsArray = [];
      for (let i = 0; i < dbReturn.length; i++) {
        cardsArray.push(dbReturn[i].dataValues); // take only the datavalues from the db pull and insert into the array.
      }
      let shuffledCards = randomizeArray(cardsArray);
      res.json(shuffledCards); // return the shuffled cards to the API request

      // implement the durstenfeld shuffle algorithm to return the array in a random order.
      function randomizeArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            let tempArray = array[i];
            array[i] = array[j];
            array[j] = tempArray;
        }
        return array; // return the array as a new variable.
    }
    });
  });

  // this route returns all cards created by a particular author
  app.get("/api/author/:author", function(req, res) {
    db.Card.findAll({where: { author: req.params.author }}).then(function(dbReturn) {
      res.json(dbReturn); // return the shuffled cards to the API request
    });
  });

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
