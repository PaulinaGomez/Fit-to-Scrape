//paquetes para descargar
var express = require("express");
var mongoose = require("mongoose");

var exphbs = require("express-handlebars");

//puerto habilitado para heroku o default
var PORT = process.env.PORT || 3000;

//importa la carpeta models
var db = require("./models");

//establece la variable app como el paquete express
var app = express();

//requisito para que express desencripte info de navegador urlencoded
//requisito para que express interprete json
//requisito para que express llame por default la carpeta public
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//establece contacto con la base de datos
mongoose.connect("mongodb://localhost/fittoscrapedb", {
  useNewUrlParser: true
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//importa los archivos de rutas
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes")(app);

//puerto desde que el app se encuentra esperando requests
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

module.exports = app;
