var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  // Routes
  //primera ruta funciona en json test en impresion en index sin guardar en db
  app.get("/", function(req, res) {
    axios.get("https://www.nytimes.com/").then(function(response) {
      var $ = cheerio.load(response.data);
      var result = [];

      $("div.css-6p6lnl").each(function(i, element) {
        var title = $(element)
          .find("h2")
          .text();
        var description = $(element)
          .find("p")
          .text();
        var link = $(element)
          .children("a")
          .attr("href");

        result.push({
          title: title,
          description: description,
          link: link

          // Create a new Article using the `result` object built from scraping
          /*  db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });*/
        });
      });
      //res.json(result);
      //falta probar si muestra el resultado en index
      res.render("index", {
        articles: result
      });
    });
  });

  //primera ruta para traer articulos, guardar en la base y muestra en index

  app.get("/scraping2", function(req, res) {
    axios.get("https://www.nytimes.com/").then(function(response) {
      var $ = cheerio.load(response.data);

      $("div.css-6p6lnl").each(function(i, element) {
        var result = {};

        result.title = $(this)
          .find("h2")
          .text();
        //falta ajustar ruta
        result.description = $(this)
          .find("h2")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
      //falta probar si asi muestra el resultado en index
      res.render("index", {
        articles: result
      });
    });
  });
};
