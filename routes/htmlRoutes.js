var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  // Routes
  //primera ruta funciona solo con ingresar a / busca info de nytimes.com
  //crea una coleccion y guarda los datos buscados
  //guarda los datos en el array result y los inyecta en el index handlebars
  //se utiliza dos veces, al ingresar a la página y al click de scrape new articles
  app.get("/", function(req, res) {
    axios.get("https://www.nytimes.com/").then(function(response) {
      var $ = cheerio.load(response.data);
      var result = [];
      //estas key deben de coincidir con los establecidos en schemas o no se guardara el dato
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
        //guarda el resultado dentro del array result, nombre key + dato
        result.push({
          title: title,
          description: description,
          link: link
        });

        //crea la coleccion article y le guarda el resultado de element
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
      //muestra el resultado en json
      /*res.json(result);*/
      //muestra el resultado inyectado en el index handlebars sin id
      /*res.render("index", {
        articles: result*/

      //hace busqueda en db para obtener resultado de busqueda + id creado por mongoose
      //inyecta todo el resultado en index.handlebars y deja id en btn save! :D
      db.Article.find({}).then(function(articles) {
        res.render("index", {
          articles: articles
        });
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
