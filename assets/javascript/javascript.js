// on page load fuction creates buttons/
$(function(){
    renderButtons(musicalInstruments, 'musicalInstrumentsName', '#musicalInstrumentsButton');

});

var musicalInstruments = ['Guitar', 'Drums', 'Bass', 'Piano', 'Vocals', 'Harmonica', 'Sitar', '12 String Guiatr', 'Fuzz Pedal', 'Lap Steel', 'Steel Guitar','Maracas'];

// creates buttons for musical instruments
function renderButtons(arrayToUse, classToAdd, areaToDo) {
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

// creates the onclick function
$('#addmusicalInstruments').on('click', function(){
    // clears previous choice before adding new
    $('#musicalInstruments').empty();
    $('.musicalInstrumentsName').removeClass('active');
    $(this).addClass('active');

    var show = $(this).data('name');
    console.log('show', show);
    var queryURL = "https://apt.giphy.com/v1/gifs/search?=" + show + "&api_key=4ht99PJTSwROjzsTFY4sB5HGrU6ZXvhx&limit=12&offset=12";

    $.ajax({
             url: queryURL,
             method: 'GET'
    })
    .done(function(respose) {
        console.log('response', response)

        var results = response.data

        for(var i=0; i < results.length; i++) {
            var musicalInstrumentsDiv = $('<div class="musicalInstruments-item col-sm3">');
            var rating = results[i].rating;

            var p = $('<h1>').text("Rating: " + rating);
            p.addClass('rating');
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;

            var musicalInstrumentsImage = $("<img>");
            musicalInstrumentsImage.addClass('img-resposive');
            musicalInstrumentsImage.attr('src', still);
            musicalInstrumentsImage.attr('data-still', still);
            musicalInstrumentsImage.attr('data-animate', animated);
            musicalInstrumentsImage.attr('data-state', 'still');
            musicalInstrumentsImage.attr('id', "musicalInstrumentsImage-" + [i]);
            musicalInstrumentsImage.addClass('musicalInstrumentsImage');

            musicalInstrumentsDiv.append(p)
            musicalInstrumentsDiv.append(musicalInstrumentsImage)

            $('#musicalInstruments').append(musicalInstrumentsDiv);
        
        }
    });

});

$(document).on('click', '.musicalInstrumentsImage', function(){
    var state = $(this).attr('data-state');

    if(state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
    }
});