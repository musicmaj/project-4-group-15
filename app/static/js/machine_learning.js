$(document).ready(() => {
    console.log("Page Loaded");

    $("#predict-submit").on('click', event => {
        console.log('predict-submit::pressed');
        event.preventDefault();
        predict();
    });

    // call Flask API endpoint
    function predict() {
        let payload = {
            'host_identity_verified': $('#host_identity_verified').checked? [1]:[0],
            'instant_bookable': $('#instant_bookable').checked? [1]:[0],
            'service_fee': [parseFloat($('#service_fee').val())],
            'minimum_nights': [parseFloat($('#minimum_nights').val())],
            'review_rate_number': [parseFloat($('#review_rate_number').val())]
        };

        const radios = [
            'boro_bronx',
            'boro_brooklyn',
            'boro_manhattan',
            'boro_queens',
            'boro_staten',
            'cancellation_policy_flexible',
            'cancellation_policy_moderate',
            'cancellation_policy_strict',
            'room_type_entire',
            'room_type_hotelr',
            'room_type_privater',
            'room_type_sharedr'
            ];

        for (let r of radios) {
            payload[r] = [0];
        }

        const borough = $('#borough_selector').val(),
            cancellation = $('#cancellation_policy').val(),
            room_type = $('#room_type').val();

        payload['boro_'+borough] = [1];
        payload['cancellation_policy_'+cancellation] = [1];
        payload['room_type_'+room_type] = [1];

        // Perform a POST request to the query URL
        $.ajax({
            type: "POST",
            url: "/predict",
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(payload),
            success: function(returnedData) {
                // print it
                console.log(returnedData);

                const prob = parseFloat(returnedData[0]);
                const price = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(prob);


                    $("#price-prediction").text(`Price Prediction: ${price}`);
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


});