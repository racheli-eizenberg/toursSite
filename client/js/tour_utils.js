
$(document).ready(function () {
    $("form[name='tour_form']").validate({
        // Specify validation rules
        rules: {
          
          "id": {
            required: true,
            digits: true,
            minlength: 6
          },
          "date":{
            required:true,
          },
          "duration":{
            required: true,
            digits: true,
            isInteger:true,
          },
          "cost":{
            required: true,
            digits: true,
          },
        },
        // Specify validation error messages
        messages: {       
          
          id:{
            digits:"Please enter only digits",
            minlength: "Your id must be at least 6 digits"
          },
          duration:{
            digits: "you must enter only digits",
          },
          cost:{
            digits: "you must enter only digits",
          },
        }
      });

    // process the form
    $('#tour_form').submit(function (event) {
        if(!$("#tour_form").valid()) return;

        console.log("in submit");
        
        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/tours', // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
              "id": $("#id").val(),
              "start_date": $("#start_date").val(),
              "duration": $("#duration").val(),
              "cost": $("#cost").val(),
             
                
            }),
            processData: false,            
           // dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function( data, textStatus, jQxhr ){
                console.log(data);
                location.href = "/main";

            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        })
          
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
