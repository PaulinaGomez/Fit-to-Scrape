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
  description: {
    type: String
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
  //nota almacena el Object ID de la coleccion note
  //la propiedad ref liga el object ID con el modal de Note
  //esta referencia permite que se relacione los articulos con las notas
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

//se crea la coleccion o modelo
var Article = mongoose.model("Article", ArticleSchema);

//se prepara la coleccion para exportar
module.exports = Article;
