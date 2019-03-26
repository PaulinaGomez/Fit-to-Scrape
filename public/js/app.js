//ejecuta las funciones siempre que se termine de descargar la pagina
$(document).ready(function() {
  //al hacer click en iAmSaved
  // guarda el id del btn seleccionado en una variable
  //ejecuta el ajax metodo get y lleva la url /saved/+id
  //luego alerta saving article
  $(document).on("click", ".iAmSaved", function() {
    event.preventDefault();

    var thisId = $(this).attr("id");

    $.ajax({
      method: "GET",
      url: "/saved/" + thisId
    }).then(function(data) {
      console.log(data);
      alert("Saving Article");
    });
  });

  //al hacer click en iAmUnsaved
  // guarda el id del btn seleccionado en una variable
  //ejecuta el ajax metodo get y lleva la url /saved/+id
  //luego alerta unsaving article
  $(document).on("click", ".iAmUnsaved", function() {
    event.preventDefault();

    var thisId = $(this).attr("id");

    $.ajax({
      method: "GET",
      url: "/unsaved/" + thisId
    }).then(function(data) {
      console.log(data);
      alert("Unsaving Article");
    });
  });

  //funcion para mostrar modal para tomar notas
  //guarda todos los elementos en variables
  //variable modal guarda el btn que abre el modal
  //variable btn es el btn que salva la nota
  //variable span guarda el btn que cierra el modal
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("openNotes");
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  };
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  //al hacer click en myBtn
  // guarda el id del btn seleccionado en una variable
  //ejecuta el ajax metodo get y lleva la url /note/ + id
  //luego agrega la informacion que regresa a la class savedNotes
  $(document).on("click", ".iAddNote", function() {
    event.preventDefault();
    $(".savedNotes").empty();
    var thisId = $(this).attr("iddb");

    $.ajax({
      method: "GET",
      url: "/note/" + thisId
    }).then(function(data) {
      console.log(data);
      //
      $(".savedNotes").append("<h2>" + data.note + "</h2>");
      $(".savedNotes").append(
        "<button class='deleteNote'>Delete Note &times;</button>"
      );
    });
  });

  //al hacer click en iAddNote
  // guarda el id del btn seleccionado en una variable
  //ejecuta el ajax metodo post y lleva la url /note/ + id
  //junto con el texto ingresado por usuario en el modal dentro del id userText
  //luego regresa y le da una alerta al usuario saving note
  $(document).on("click", ".iAddNote", function() {
    event.preventDefault();

    var thisId = $(this).attr("iddb");

    $.ajax({
      method: "POST",
      url: "/note/" + thisId,
      data: {
        note: $("#userText").val()
      }
    }).then(function(data) {
      console.log(data);
      alert("Saving Note");
      $("#userText").val("");
    });
  });
});

/*
$(document).on("click", "#openNotes", function() {
  event.preventDefault();
  debbuger;
  $(".iAddNote").attr($("#openNotes").attr("idDB"));
  modal.style.display = "block";
});
*/
