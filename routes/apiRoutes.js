var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");
//var mongojs = require("mongojs");

//var db2 = mongojs(fittoscrapedb, collections);

module.exports = function(app) {
  app.use(express.json());
  //funcion para traer el id y cambiar el key de saved a true
  app.get("/saved/:id", function(req, res) {
    //cambiar tipo de find a update
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
      .then(function(data) {
        console.log(data);
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
  app.get("/unsaved/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //funcion para traer el id del articulo y las notas relacionadas
  app.get("/note/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then(function(dbArticle) {
        res.json(dbArticle, {
          notes: allNotes
        });
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //funcion para traer agregar una nota
  //encuentra el articulo usando req.params.id,
  //corre el metodo populate con la coleccion de note
  //responde con el articulo con la nota agregada
  app.post("/note/:id", function(req, res) {
    db.Note.create(req.note).then(function(dbNote) {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { note: dbNote._id },
        { new: true }
      )
        .populate("note")
        .then(function(dbArticle) {
          res.json(dbArticle, {
            notes: allNotes
          });
        })
        .catch(function(err) {
          res.json(err);
        });
    });
  });
};
