//llama al paquete mongoos
var mongoose = require("mongoose");

//llama al paquete schema de mongoose
var Schema = mongoose.Schema;

//se crea el schema para esta coleccion igual al modelo de la tabla
var ArticleSchema = new Schema({
  //columna titulo de tipo string requerida
  title: {
    type: String,
    required: true
  },
  //columna link de tipo string requerida
  link: {
    type: String,
    required: true
  },
  //columna tipo boolean que bandera que distingue articulos salvados y no salvados
  saved: {
    type: Boolean,
    default: false
  },
  //nota que hace referencia a la segunda tabla de notas y se trae el Id de la misma
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

//se crea la coleccion o modelo
var Article = mongoose.model("Article", ArticleSchema);

//se prepara la coleccion para exportar
module.exports = Article;
