
$(document).ready(function () {

var data=""
jQuery.validator.addMethod("idExist", function(value, element) {
  alert(global_id.find(element => element=== $('#id_field'))!=='undefined')
  return global_id.find(element => element=== $('#id_field'))!=='undefined';
}, "tour id exist, please enter a differnet id"); 
  $("form[name='create_tour_form  ']").validate({
   
    // Specify validation rules
    rules: {
      "id_field": {
        required: true,
        digits: true,
        minlength: 6,
        idExist:true
        
      },
      "start_date": {
        required: true,
        min: new Date().toISOString().slice(0,10)//??
      },
      "duration": {
        min:0,//??
        required: true,
        digits: true,
        //isInteger: true,
      },
      "cost": {
        min:0,//??
        required: true,
        digits: true,
      },
    },  
    // Specify validation error messages
    messages: {
      id_field: {
        digits: "Please enter only digits",
        minlength: "Your id must be at least 6 digits",
        idExist:"tour id exist, please enter a differnet id"
      },
      start_date:{
        min: "the min date is today"//??
      },
      duration: {
        digits: "you must enter only digits",
      },
      cost: {
        digits: "you must enter only digits",
      },
    }
    
  });

  // process the form
  $('#create_tour_form').submit(function (event) {
   


    if (!$("#create_tour_form").valid())
      return;
    ////////////
  
    // process the form
    $.ajax({
      type: 'POST',
      url: '/tours',
      contentType: 'application/json',
      data: JSON.stringify({
        "id": $("#id_field").val(),
        "date": $("#start_date").val(),
        "duration": $("#duration").val(),
        "cost": $("#cost").val(),
      }),
      processData: false,
      encode: true,
      success: function (data, textStatus, jQxhr) {
        
        console.log(data);
        location.href = "/toursList";

      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      
   
    
  }
})
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });
 
// if(localStorage.getItem("formType")==="update")
// {
  // alert("update")
  // console.log( $('<div/>').html(html).contents("form[name='update_tour_form']").val())
  //  $('<div/>').html(html).contents("form[name='update_tour_form']").validate({
    $("form[name='update_tour_form']").validate({
    // Specify validation rules
    rules: {
      
      "date": {
       // required: true,
       min: new Date().toISOString().slice(0,10)//??

      },
      "duration": {
      //  required: true,
        digits: true,
        //isInteger: true,
      },
      "cost": {
       // required: true,
        digits: true,
      },
    },
    // Specify validation error messages
    messages: {
       id: {
      //   digits: "Please enter only digits",
        min: "The minimum date is today"
       },
      duration: {
        digits: "you must enter only positive integer ",
      },
      cost: {
        digits: "you must enter only positive integer",
      },
    }
    
  });

  // process the form
  $('#update_tour_form').submit(function (event) {
    

    if (!$('#update_tour_form').valid())
       return;
  
  
    // process the form
    $.ajax({
      type: 'PUT',
      url: '/tours'+'/'+localStorage.getItem('tourId'),
      contentType: 'application/json',
      data: JSON.stringify({
        "date": $("#start_date").val(),
        // "start_date": $("#id_field").val(), ???????????
        "duration": $("#duration").val(),
        "cost": $("#cost").val(),
      }),
      processData: false,
      encode: true,
      success: function (data, textStatus, jQxhr) {
        localStorage.clear();///??
        window.location.reload();//?? location.href = "/turs";

      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });

    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });
//}

jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please"); 


  $("form[name='add_site_form']").validate({
   
    // Specify validation rules
    rules: {
      
      "siteName": {
        required: true,
        lettersonly: true,
      },
      "countryName": {
        required: true,
        lettersonly: true,
        //isInteger: true,
      },
      "index": {
       required: true,
        digits: true,
      },
    },
    // Specify validation error messages
    messages: {
      // id: {
      //   digits: "Please enter only digits",
      //   minlength: "Your id must be at least 6 digits"
      // },
      siteName: {
        required:"field required",
        lettersonly:"Letters only please"
      },
      countryName: {
        required:"field required",
        lettersonly:"Letters only please"
      },
      index: {
        required:"field required"
      },
    }
    
  });
 
  // process the form
  $('#add_site_form').submit(function (event) {
   
    if (!$("#add_site_form").valid())
       return;

  
    // process the form
    $.ajax({
      type: 'PUT',
      url: 'tours/addSite'+'/'+localStorage.getItem('tourId'),
      contentType: 'application/json',
      data: JSON.stringify({
        "siteDetails":{
          "siteName": $("#siteName").val(),
          "countryName": $("#countryName").val()
        },
        "index": $("#index").val(),
      }),
      processData: false,
      encode: true,
      success: function (data, textStatus, jQxhr) {
          window.location.reload();
      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });

    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });
// ///////////////////////////////////////////////////////

$.validator.addMethod('greaterThan', function(value, element) {

  var dateFrom = $("#startDate").val();
  var dateTo = $('#expiryDate').val();

  return dateTo > dateFrom;

});
 
  $("form[name='add_coupon_form']").validate({
   
    // Specify validation rules
    rules: {
      
      "codeCoupon": {
        required: true,
      },
      "startDate": {
        required: true,
        greaterThan:true
      },
      "expiryDate": {
       required: true,
       // digits: true,
       check_date:true
      },
      "discountPercentage": {
        required: true,
        // digits: true,
       },
    },
    // Specify validation error messages
    messages: {
      // id: {
      //   digits: "Please enter only digits",
      //   minlength: "Your id must be at least 6 digits"
      // },
      codeCoupon: {
        required:"field required"
       // digits: "you must enter only digits",
      },
      startDate: {
        required:"field required",
        greaterThan:"start date must be before expiry date"
      },
      expiryDate: {
        required:"expiry date can't be after the tour begins",
        check_date:"date"
      },
      discountPercentage: {
        required:"field required"
      },
    }
    
  });

  // process the form
  $('#add_coupon_form').submit(function (event) {
    
    if (!$("#add_coupon_form").valid())
    {
      return;
    }
    
 
    $.ajax({
     
        type: 'PUT',
        url: 'tours/addCoupun'+'/'+localStorage.getItem('tourId'),
        contentType: 'application/json',
        data: JSON.stringify({
         
            "codeCoupon": $("#codeCoupon").val(),
            "startDate": $("#startDate").val(),
            "expiryDate": $("#expiryDate").val(),
            "discountPercentage": $("#discountPercentage").val()
         
        }),
        processData: false,
        encode: true,
        success: function (data, textStatus, jQxhr) {
       
          window.location.reload();
        },
          
        error: function (jqXhr, textStatus, errorThrown) {
         alert(jqXhr.responseText)
          console.clear();
          // console.log(errorThrown);
        },
        
      }); 
        


    event.preventDefault();
  });
});


