$(document).ready(function() {

    // Initial array of the animals that will be presented on the page as it loads

    var topics = ["Dog", "Cat", "Lion", "Tiger", "Crocodile", "Donkey"];

   

    function displayInfo() {
        var animal = $(this).attr("animal-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=k8uXFbp5lvRMj97BOFPZpkxjkebLitVw";

        //Using Ajax to make  a call to the  API a nd get the response of Data back

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {

            console.log(response);
            
        // clear the page so that new images can replace the old images as the Buttons are clicked.
            $("#gifs-appear-here").empty();

            var results = response.data;

            //user for loop to grab the rating information and appropriate gif for button clicked into its own div to keep information together
            // ALso as per instruction only 10 Static non-Animated Images are loaded.

            for (var i = 0; i < 10; i++) {
                var animalDiv = $("<div>");

               

                var rating = results[i].rating;
                var rate = $("<p>").text("Rating: " + rating);

                

                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;

                //gif needs still source to load, and data attributes to store the still and animated gifs for pausing function

                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

                //The images and the ratings are added to new Div (Appended).

                animalDiv.append(gif);
                animalDiv.append(rate);
        

                $('#gifs-appear-here').append(animalDiv);

            }

            //on click of gif still image, gif will play. When clicked again, gif will pause.

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                
                }
            });

    });

    }

    //create buttons out of array indexes - gets information from JSON

    function renderButtons() {

        //delete original array of buttons everytime renders so they do not keep repeating

        $("#buttons-view").empty();

        //loop through array

        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");

            //add class and attribute of name so display function knows what to GET.

            a.addClass("animal btn-sm btn-primary");
            a.attr("animal-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }
    }

    //on click event to add an additional Animal button when submitted - push input to array.

        $("#add-animal").on("click", function(event) {
            event.preventDefault();
            var animal = $("#animal-input").val().trim();

            //push input to original topics array and then rerun render of buttons to show newly added button.
            topics.push(animal);
                $("#animal-input").val(" ");
            renderButtons();
        });
   

    //on click entire document to cover all elements named "Animal" and run display function
    $(document).on("click", ".animal", displayInfo);

    //run function to display all buttons on startup
    renderButtons();

});
