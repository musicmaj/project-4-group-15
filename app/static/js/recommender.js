$(document).ready(function() {
    console.log("recommender:page-loaded");

    $("#recommender-form").on('click', event => {
        console.log('recommender-form::submit-pressed');
        event.preventDefault();
        recommendation();
    });
});

// call Flask API endpoint
function recommendation() {
    const payload = {
        'closest_rentals_length': $('#closest_rentals_length').val(),
        'neighborhood_group': $('#neighborhood_group').val(),
        'room_type': $('#room_type').val(),
        'price': parseFloat($('#price').val())
    };

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/api/recommendation",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(payload),
        success: function(returnedData) {
            // print it
            console.log(returnedData);

            //var prob = parseFloat(returnedData["recommendation"]);

            //if (prob > 0.5) {
                //$("#output").text(`You Survived with probability ${prob}!`);
            //} else {
                //$("#output").text(`You did not survive with probability ${prob}, sorry. :(`);
            //}

        },



        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}
