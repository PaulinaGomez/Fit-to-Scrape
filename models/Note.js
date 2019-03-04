var mongoose = require("mongoose");

//llama al paquete schema de mongoose
var Schema = mongoose.Schema;

//se crea el schema para esta coleccion igual al modelo de la tabla
var NoteSchema = new Schema({
  //columna body de tipo string requerida
  note: {
    type: String,
    default: "No note saved"
  }
});

//se crea la coleccion o modelo
var Note = mongoose.model("Note", NoteSchema);

//se prepara la coleccion para exportar
module.exports = Note;
