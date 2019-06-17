var db = require("../models");

module.exports = function (app) {
  // Get all cards for a particular category.
  app.get("/api/cards/:category", function (req, res) {
    db.Card.findAll({ where: { category: req.params.category } }).then(function (dbReturn) {
      let cardsArray = [];
      for (let i = 0; i < dbReturn.length; i++) {
        cardsArray.push(dbReturn[i].dataValues); // take only the datavalues from the db pull and insert into the array.
      }
      let shuffledCards = randomizeArray(cardsArray);
      res.json(shuffledCards); // return the shuffled cards to the API request

      // implement the durstenfeld shuffle algorithm to return the array in a random order.
      function randomizeArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let tempArray = array[i];
          array[i] = array[j];
          array[j] = tempArray;
        }
        return array; // return the array as a new variable.
      }
    });
  });

  // returns all cards created by a particular author
  app.get("/api/author/:author", function (req, res) {
    db.Card.findAll({ where: { author: req.params.author } }).then(function (dbReturn) {
      res.json(dbReturn); 
    });
  });

  // returns the info for a card by ID
  app.get("/api/card_id/:card_id", function (req, res) {
    db.Card.findAll({ where: { id: req.params.card_id } }).then(function (dbReturn) {
      res.json(dbReturn); 
    });
  });

  // returns a list of all distinct categories we have questions for
  app.get("/api/categories", function (req, res) {
    db.Card.aggregate('category', 'DISTINCT', { plain: false }
    ).then(function (dbReturn) {
      // want to pass forward just an array with all the categories and no extra data
      let catsArray = [];
      for (let i = 0; i < dbReturn.glength; i++) {
        catsArray.push(dbReturn[i].dataValues); // take only the datavalues from the db pull and insert into the array.
      }
      res.json(dbReturn); // return the shuffled cards to the API request
    });
  });
  
    // returns a list of all distinct authors we have questions for
    app.get("/api/authors", function (req, res) {
      db.Card.aggregate('author', 'DISTINCT', { plain: false }
      ).then(function (dbReturn) {
        // want to pass forward just an array with all the categories and no extra data
        let authsArray = [];
        for (let i = 0; i < dbReturn.glength; i++) {
          authsArray.push(dbReturn[i].dataValues); // take only the datavalues from the db pull and insert into the array.
        }
        res.json(dbReturn); // return the shuffled cards to the API request
      });
    });

  // Create a new example
  app.post("/api/cards", function (req, res) {
    db.Card.create(req.body).then(function (dbReturn) {
      res.json(dbReturn);
    });
  });

  // Update an existing card
  app.put("/api/update", function(req, res) {
    db.Card.update({
      question: req.body.question,
      answer: req.body.answer,
      author: req.body.author,
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbUpdate) {
      res.json(dbUpdate);
    });
  });

  // Delete an example by id
  app.delete("/api/delete/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Card.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });

  });
};
