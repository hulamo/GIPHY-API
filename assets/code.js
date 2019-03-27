var animales = ["Cat", "Dog", "Bird", "Eagle","Snake","Mouse","Tiger"];

$(document).ready(function(){

    function renderButtons() {


$("#botones").empty();
for (var i = 0; i < animales.length; i++) {

  var a = $("<button>");
  a.addClass("animalc");
  a.attr("data-animal", animales[i]);
  a.text(animales[i]);
  $("#botones").append(a);
 $("#botones").append(" "); 
}
}

$("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var animal = $("#animal-input").val().trim();

        // The movie from the textbox is then added to our array
        animales.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });


      $(document).on("click" ,".animalc", function() {
      console.log("paso");
      var animal2 = $(this).attr("data-animal");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal2 + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;

          $("#animals-view").empty();
          
         // console.log(results.length);
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");    

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);
            animalImage.attr("data-mov", results[i].images.fixed_height.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-modo", "mov");

          if (rating !== "r") {
            gifDiv.append(p);
            gifDiv.append(animalImage);
          }
           // if (i===results.length-1)

            $("#animals-view").prepend(gifDiv);
          }
        });
    });


    $(document).on("click" ,"img", function() {
if($(this).attr("data-modo") == "mov"){
$(this).attr("src", $(this).attr("data-still"));
$(this).attr("data-modo", "still");
}
else
{
    $(this).attr("src", $(this).attr("data-mov"));
$(this).attr("data-modo", "mov");

}
    });


renderButtons();

});

