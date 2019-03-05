// on page load fuction creates buttons/
$(function(){
    renderButtons(musicalInstruments, 'musicalInstrumentName', '#musicalInstrumentButtons');
});

var musicalInstruments = ['Electric Guitar', 'Drums', 'Bass', 'Piano', 'Vocals', 'Harmonica', 'Sitar', '12 String Guitar', 'Slide Guitar','Maracas'];

// creates buttons for musical instruments
function renderButtons(arrayToUse, classToAdd, areaToAddTo) {
         $(areaToAddTo).empty();

         for(var i=0; i<arrayToUse.length; i++){
             var a = $('<button>')
             a.addClass(classToAdd);
             a.addClass('btn btn-default btn-lg');
             a.attr('type', 'button');
             a.attr('data-name', arrayToUse[i]);
             a.text(arrayToUse[i]);
             $(areaToAddTo).append(a);
         }
}

// creates the onclick function for musical instruments buttons to create new buttons based on user input
$('#addMusicalInstrument').on('click', function(){
    var newInsturment = $("#musicalInstrument-input").val().trim();
    $("#musicalInstrument-input").val("");
    musicalInstruments.push(newInsturment);
    renderButtons(musicalInstruments, 'musicalInstrumentName','#musicalInstrumentButtons');
    return false;
});
// creates on click function for musical instruments buttons
$(document).on('click', '.musicalInstrumentName', function(){
    // clears previous choice before adding new
    $('#musicalInstruments').empty();
    $('.musicalInstrumentName').removeClass('active');
    $(this).addClass('active');

    var show = $(this).data('name');
    console.log('show', show);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=4ht99PJTSwROjzsTFY4sB5HGrU6ZXvhx&limit=12&offset=12";

    $.ajax({
             url: queryURL,
             method: 'GET'
    })
    .done(function(response) {
        console.log('response', response)

        var results = response.data;

        for(var i=0; i < results.length; i++) {
            var musicalInstrumentDiv = $('<div class="musical-item col-sm3">');
            var rating = results[i].rating;

            var p = $('<h1>').text("Rating: " + rating);
            p.addClass('rating');
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;

            var musicalInstrumentImage = $("<img>");
            musicalInstrumentImage.addClass('img-resposive');
            musicalInstrumentImage.attr('src', still);
            musicalInstrumentImage.attr('data-still', still);
            musicalInstrumentImage.attr('data-animate', animated);
            musicalInstrumentImage.attr('data-state', 'still');
            musicalInstrumentImage.attr('id', "musicalInstrumentImage-" + [i]);
            musicalInstrumentImage.addClass('musicalInstrumentImage');

            musicalInstrumentDiv.append(p)
            musicalInstrumentDiv.append(musicalInstrumentImage)

            $('#musicalInstruments').append(musicalInstrumentDiv);
        
        }
    });

});

$(document).on('click', '.musicalInstrumentImage', function(){
    var state = $(this).attr('data-state');

    if(state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
    }
});