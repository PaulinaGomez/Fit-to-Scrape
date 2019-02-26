var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  // Routes
  //primera ruta funciona solo con ingresar a / busca info fr nytimes.com
  //crea una coleccion y guarda los datos buscados
  //guarda los datos en el array result y los inyecta en el index handlebars
  app.get("/", function(req, res) {
    axios.get("https://www.nytimes.com/").then(function(response) {
      var $ = cheerio.load(response.data);
      var result = [];

      $("div.css-6p6lnl").each(function(i, element) {
        var title = $(element)
          .find("h2")
          .text();
        var description = $(element)
          .find("ul")
          .text();
        var link =
          "https://www.nytimes.com" +
          $(element)
            .children("a")
            .attr("href");

        result.push({
          title: title,
          description: description,
          link: link
        });

        // crea la coleccion article y le guarda el resultado de element
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
        //guarda el resultado dentro del array result
      });
      //muestra el resultado en json
      /*res.json(result);*/
      //muestra el resultado inyectado en el index handlebars
      res.render("index", {
        articles: result
      });
    });
  });

  //segunda ruta para scrape again

  app.get("/home", function(req, res) {
    db.Article.find({}).then(function(articles) {
      res.render("index", {
        articles: articles
      });
    });
  });
};
