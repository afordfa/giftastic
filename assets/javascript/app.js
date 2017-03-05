$(document).ready(function() {

	var showArray = [
	"AbFab",
	"Are You Being Served",
	"Sherlock Holmes",
	"Dr. Who",
	"Red Dwarf",
	"Downton Abbey",
	"The IT Crowd",
	"Black Adder"
	]

	var selectedShow = "";
	var showImage = "";
	var stillUrl = "";
	var animatedUrl = "";
	var animated = false;
	var gifObjects = [];


	displayButtons();



	//this function shows the buttons with all the values currently in the array
	//starts by emptying the area, so duplicates do not happen on add
	// displays the text from the array
	// adds class attributes
	// adds value attribute equal to the index of the array
	function displayButtons() {
		$(".button-area").empty();
		for (var i = 0; i < showArray.length; i++) {
			var buttonText =  $("<div>");
			buttonText.text(showArray[i]);
			buttonText.attr("class", "btn btn-info gif-button gif-button" + i);
			buttonText.attr("value", i);
			$(".button-area").append(buttonText);
		}
	};


      // This function handles events where one button is clicked
      $(".add-show").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var newShow = $(".show-input").val().trim();

        // The movie from the textbox is then added to our array
        showArray.push(newShow);
        $(".show-input").val("");

        // Calling renderButtons which handles the processing of our movie array
        displayButtons();

      });



	//click handler for when user clicks on a button with a show name
	//resets initial variables to default values
	//calls giphy api to pull 10 gifs using the show the user selected

	$(document).on("click", ".gif-button", function(){	
		$(".gif-box").empty();

		selectedShow = "";
		showImage = "";
		stillUrl = "";
		animatedUrl = "";
		animated = false;
		gifObjects = [];


		selectedShow = $(this).html();

	//giphy api url/endpoint
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        selectedShow + "&api_key=dc6zaTOxFJmzC&limit=10";

    //call to giphy api
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        var results = response.data;
        
        //loops through results and displays them to the screen
        for (var i = 0; i < results.length; i++) {
            var showDiv = $("<div>");
            showDiv.attr("class", "gif-image-div");
            var p = $("<p>");
            p.attr("class", "rating");
            p.text("Rating: " + results[i].rating);
            showImage = $("<img>");
            showImage.attr("class", "single-image image" + i)
            showImage.attr("src", results[i].images.fixed_height_still.url);
            showImage.attr("data", i);
            showDiv.append(p);
            showDiv.append(showImage);
            $(".gif-box").append(showDiv);

            //gets still and animated URL's
            stillUrl = results[i].images.fixed_height_still.url;
            animatedUrl = results[i].images.fixed_height.url;

            // pushes information about gif to gifObjects array
            gifObjects.push({stillUrl: stillUrl, animatedUrl: animatedUrl, index: i, animated: false});

        }
      })
	});


        //click handler for when user clicks on a gif image. Checks to see if
        //gif is animated or still, and changes it to the opposite state

    $(document).on("click", ".single-image", function() {
    	imageClicked = parseInt(this.getAttribute("data"));

    	//check to see if the image is currently animated
    	if (gifObjects[imageClicked].animated) {
    		gifObjects[imageClicked].animated = false;
    		this.src = gifObjects[imageClicked].stillUrl;
    	} else {
 			gifObjects[imageClicked].animated = true;
    		this.src = gifObjects[imageClicked].animatedUrl;
    	};
    });
});	