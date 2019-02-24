var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
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

  //misma logica que el inicio modificar cuando se verifique el primer get
  app.get("/scrapeagain", function(req, res) {
    axios.get("https://www.nytimes.com/").then(function(response) {
      var $ = cheerio.load(response.data);
      var result = [];

      $("div.css-6p6lnl").each(function(i, element) {
        var title = $(element)
          .find("h2")
          .text();
        var link = $(element)
          .children("a")
          .attr("href");

        result.push({
          title: title,
          link: link
        });
      });
      //falta probar si muestra el resultado en index
      res.render("index", {
        articles: result
      });
    });
  });

  //funcion para traer el id y cambiar el key de saved a true
  app.get("/saved/:id", function(req, res) {
    //cambiar tipo de find a update
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
  app.get("/unsaved", function(req, res) {});

  //funcion para traer agregar una nota
  app.get("/notes", function(req, res) {});
};
