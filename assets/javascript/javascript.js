var listgif =[
"dog",
"cat",
"bat",
"rat",


];

function gifdisplay(){
    var gif =$(this).attr("data-gif");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=OJum4suXY6BhKSlun4G61BJ5rlaNP88t";
    console.log(queryURL);

    $.ajax({
        url:queryURL,
        method: "GET"
    })

    .then(function(response){
        var results = response.data;
        console.log(response);
        console.log(results);

        for(var i =0; i <results.length; i++){
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p =$("<p>").text("Rating: " + rating);
            var image = $("<img>");
            image.addClass("gif");

            image.attr({
                "src": results[i].images.fixed_height_still.url,
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
                "data-state": "still"
            });
            gifDiv.append(p);
            gifDiv.append(image);
            $("#gifs-here").prepend(gifDiv);
        }
    });
}

function makeButton(){
    $('#Buttons').empty();
    for(var i = 0; i <listgif.length; i++){
        var newbutton = $("<button>");
        newbutton.addClass("gifs");
        newbutton.attr("data-gif", listgif[i]);
        newbutton.text(listgif[i]);
        $('#Buttons').append(newbutton);
    }
}

$(document).on('ready', function(){
    $('#addgif').on("click", function(event){
        event.preventDefault();
        var gif = $('#gif-input').val().trim();

        if(!(gif === '')){

        }else{
            alert("Enter a gif");
            gif.stop()
        }
        listgif.push(gif);
        makeButton();
    });
    $(document).on('click', '.gifs', gifdisplay);

    makeButton();

    $(document).on('click','.gif', function(){
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          };
    } );
});