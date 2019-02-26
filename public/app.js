$(document).ready(function() {
  //al hacer click en save
  $(document).on("click", ".iAmSaved", function() {
    event.preventDefault();
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("id");

    $.post("/saved/:id", savedArticle)
      // on success, run this callback
      .then(function(data) {
        // log the data we found
        console.log(data);
        // tell the user we're adding a character with an alert window
        alert("Saving Article");
      });
  });
});
