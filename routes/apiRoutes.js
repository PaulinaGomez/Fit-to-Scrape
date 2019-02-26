var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
//var mongojs = require("mongojs");

//var db2 = mongojs(fittoscrapedb, collections);

module.exports = function(app) {
  //funcion para traer el id y cambiar el key de saved a true
  app.get("/saved/:id", function(req, res) {
    //cambiar tipo de find a update
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { saved: true } }
    )
      .then(function(saved) {
        res.render("saved", {
          saved: saved
        });
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //llama a todos los elementos de la base de datos que tengan saved=true
  app.get("/saved", function(req, res) {
    db.Article.find({ saved: true })
      .then(function(allSavedArticles) {
        res.render("saved", {
          saved: allSavedArticles
        });
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //funcion para traer el id y cambiar el key de saved a false
  app.get("/unsaved", function(req, res) {
    db.Article.findOne({ _id: req.params.id });
  });

  //funcion para traer agregar una nota
  //encuentra el articulo usando req.params.id,
  //corre el metodo populate con la coleccion de note
  //responde con el articulo con la nota agregada
  app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
