var mongoose = require("mongoose");

//llama al paquete schema de mongoose
var Schema = mongoose.Schema;

//se crea el schema para esta coleccion igual al modelo de la tabla
var NoteSchema = new Schema({
  //columna titulo de tipo string requerida
  title: String,
  //columna body de tipo string requerida
  body: String
});

//se crea la coleccion o modelo
var Note = mongoose.model("Note", NoteSchema);

//se prepara la coleccion para exportar
module.exports = Note;
