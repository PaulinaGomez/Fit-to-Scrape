$(document).ready(function() {
  //al hacer click en save
  $(document).on("click", ".iAmSaved", function() {
    event.preventDefault();
    // guarda el id del buton seleccionado en una variable
    var thisId = $(this).attr("id");

    $.ajax({
      method: "GET",
      url: "/saved/" + thisId
    }).then(function(data) {
      console.log(data);
      // tell the user we're adding a character with an alert window
      alert("Saving Article");
    });
  });

  $(document).on("click", ".iAmUnsaved", function() {
    event.preventDefault();
    // guarda el id del buton seleccionado en una variable
    var thisId = $(this).attr("id");

    $.ajax({
      method: "GET",
      url: "/unsaved/" + thisId
    }).then(function(data) {
      console.log(data);
      // tell the user we're adding a character with an alert window
      alert("Unsaving Article");
    });
  });

  // Get the modal
  var modal = document.getElementById("myModal");
  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");
  // Get the <span> element that closes the modal
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

  $(document).on("click", ".iAddNote", function() {
    event.preventDefault();
    // guarda el id del btn seleccionado en una variable
    var thisId = $(this).attr("id");

    $.ajax({
      method: "POST",
      url: "/note/" + thisId,
      data: {
        //texto ingresado por usuario en modal
        note: $("#userText").val()
      }
    }).then(function(data) {
      console.log(data);
      // tell the user we're adding a character with an alert window
      alert("Saving Note");
    });
  });
});
