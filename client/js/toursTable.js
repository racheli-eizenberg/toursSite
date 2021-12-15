
function update_tour(id){

     let str='';
      
        str += "<h3>Update Tour</h3>";
        str += "<form id='update_tour_form' name='update_tour_form' method='PUT'>";
        str += "<div id='name-group' class='form-group'>";
        str += "<label for='start_date'>Start Date</label>";
        str += "<input type='date'class='form-control' name='start_date' id='start_date'placeholder='"+"enter the date the tour begins"+"'>";
        str+="</div>"
        str+="<div id='name-group' class='form-group'>"
        str+="<label for='duration'>Trip Duration</label>"
        str+="<input type='number' class='form-control 'name='duration' id='duration'placeholder='"+"write duration in days here"+"'>";
        str+="</div>"
        str+="<div id='name-group' class='form-group'>"
        str+="<label for='cost'>cost ILS</label>"
        str+="<input type='number' class='form-control' name='cost' id='cost'placeholder='write cost here'class='input-only-numbers demostration '>"
        str+="</div>"
        str+="<button id='updateBtn'type='submit ' class=' btn btn-success'>Update <span class='fa fa-arrow-right'></span></button>"
        str+="</form> ";
        str+=" <script src='../js/tour_utils.js'></script>";
        
        //myStorage = window.localStorage;
        localStorage.setItem('tourId', id);
      $(".modal").children(".modal-content").html(str);
      $(".modal").show()

   
  window.onclick = function(e){
    console.log("target",e)
    console.log("moda",$(".modal"))
    if(e.target ==document.querySelector(".modal")){
      $(".modal").hide();
    }
  }


      
}

function add_site(id){

     
     let str='';
        str += "<h3>Add Site To Tour</h3>";
        str += "<form id='add_site_form' name='add_site_form' method='PUT'>";
        str += "<div id='name-group' class='form-group'>";
        str += "<label for='siteName'>Site Name</label>";
        str += "<input type='text'class='form-control' name='siteName' id='siteName'placeholder='"+"enter the site name here"+"' required>";
        str+="</div>"
        str+="<div id='name-group' class='form-group'>"
        str+="<label for='countryName'>Country Name</label>"
        str+="<input type='text' class='form-control 'name='countryName' id='countryName'placeholder='"+"write Country Name here"+"'required>";
        str+="</div>"
        str+="<div id='name-group' class='form-group'>"
        str+="<label for='index'>Index</label>"
        str+="<input type='number' class='form-control' name='index' id='index'placeholder='insert the index where you want to place the site'class='input-only-numbers demostration 'required>"
        str+="</div>"
        str+="<button id='addSiteBtn'type='submit ' class=' btn btn-success'>Add <span class='fa fa-arrow-right'></span></button>"
        str+="</form> ";
        str+=" <script src='../js/tour_utils.js'></script>";
        localStorage.setItem('tourId', id);
      $(".modal").children(".modal-content").html(str);
      $(".modal").show()
      
    
  window.onclick = function(e){
    if(e.target ==document.querySelector(".modal")){
      $(".modal").hide();
    }
  }


      
}

function add_coupon(id){
      
     let str='';
        str += "<h3>Add Coupon To Tour</h3>";
        str += "<form id='add_coupon_form' name='add_coupon_form' method='PUT'>";
        str += "<div id='name-group' class='form-group'>";
        str += "<label for='codeCoupon'>Coupon Code</label>";
        str += "<input type='text'class='form-control' name='codeCoupon' id='codeCoupon'placeholder='"+"enter the codeCoupon here"+"' required>";
        str+="</div>"
        str+="<div id='name-group' class='form-group'>"
        str+="<label for='startDate'>Start Date</label>"
        str+="<input type='date' class='form-control 'name='startDate' id='startDate'placeholder='"+"enter Start Date here"+"'required>";
        str+="</div>"
        str+="<div id='name-group' class='form-group'>"
        str+="<label for='expiryDate'>expiryDate</label>"
        str+="<input type='date' class='form-control 'name='expiryDate' id='expiryDate'placeholder='"+"enter expiryDate  here"+"'required>";
        str+="</div>"
        // str+="<div id='name-group' class='form-group'>"
        // str+="<label for='expiryDate'>Expiry Date</label>"
        // str+="<input type='date' class='form-control 'name='expiryDate' id='expiryDate'placeholder='"+"enter Expiry Date here"+"'required>";
        // str+="</div>"
        str+="<div id='name-group' class='form-group'>"
        str+="<label for='discountPercentage'>Discount Percentage</label>"
        str+="<input type='number' class='form-control' name='discountPercentage' id='discountPercentage'placeholder='insert the Discount Percentage place the site'class='input-only-numbers demostration 'required>"
        str+="</div>"
        str+="<div hidden id='tourId'>"+id+"</div>";
        str+="<button id='addSiteBtn'type='submit ' class=' btn btn-success'>Add <span class='fa fa-arrow-right'></span></button>"
        str+="</form> ";
        str+=" <script src='../js/tour_utils.js'></script>";
        
        localStorage.setItem('tourId', id);
      $(".modal").children(".modal-content").html(str);
      $(".modal").show()
      
   
  window.onclick = function(e){
    if(e.target ==document.querySelector(".modal")){
      $(".modal").hide();
    }
  }


      
}

const deleteRendererComponent = (params) => {

    var btn = document.createElement("button");
    btn.innerHTML = "Delete Tour";
    // btn.setAttribute( "tourId", tourId );
    btn.onclick = function (e) {
      $.ajax({
        type: "DELETE",
        url: 'http://localhost:3001/tours/' + params.data.id,
        success: function (data) {
  
          window.location.reload();
  
        },
        error: function (errorThrown) {
          alert("failed to delete tour ");
  
        }
      })
    };
    return btn;
  
  }
const updateRendererComponent = (params) => {
    var btn = document.createElement("button");
    
    btn.innerHTML = "update Tour";
  
    btn.onclick = function (e) {

      update_tour(params.data.id)
     
    }
      return btn;
  
  }
const addSiteRendererComponent = (params) => {
    var btn = document.createElement("button");
    btn.innerHTML = "addSite to Tour";
    btn.onclick = function (e) {
      add_site(params.data.id)
      }
    
  
    return btn;
  
  }
const addCouponRendererComponent = (params) => {
    var btn = document.createElement("button");
    btn.innerHTML = "addCoupon Tour"
      btn.onclick = function (e) {
       
        add_coupon(params.data.id);
      }
    return btn;
  
  }
const viewSitesRendererComponent=(params)=>{
  var btn = document.createElement("button");
  btn.innerHTML = "View Sites";
  btn.onclick = function (e) {
  
   
     localStorage.setItem("tourId",params.data.id);
      window.location.href="/viewSites";
   
      
  }
  return btn;

}
const viewCouponRendererComponent=(params)=>{
  var btn = document.createElement("button");
  btn.innerHTML = "View Coupons";
  btn.onclick = function (e) {
  
   
     localStorage.setItem("tourId",params.data.id);
      window.location.href="/viewCoupons";
   
      
  }
  return btn;
}
const numberSort = (num1, num2) => {
  return num1 - num2;
};
  var columnDefs = [
    { field: 'id', sortable: true ,comparator:numberSort},
    { field: 'date', sortable: true
    //comparator: dateComparator 
    },
    { field: 'duration', sortable:true,comparator:numberSort},
    { field: 'cost', sortable:true,comparator:numberSort},
    {
      headerName: 'Actions',
      children: [
        {
          field: "Delete",
          cellRenderer: deleteRendererComponent,
          cellRendererParams: {
            // pass the field value here
          }
        },
        {
          field: "Update",
          cellRenderer: updateRendererComponent,
          cellRendererParams: {
            // pass the field value here
          }
        },
        {
          field: "Add Site",
          cellRenderer: addSiteRendererComponent,
          cellRendererParams: {
            // pass the field value here
          }
  
        },
        {
          field: "Add Coupon",
          cellRenderer: addCouponRendererComponent,
          cellRendererParams: {
            // pass the field value here
          }
  
        },
        {
          field: "View Sites" ,
          cellRenderer: viewSitesRendererComponent,
          cellRendererParams: {
            // pass the field value here
          }
  
        },
        {
          field: "View Sites" ,
          cellRenderer: viewCouponRendererComponent,
          cellRendererParams: {
            // pass the field value here
          }
  
        }
      ]
    }
  
  ];
  
  function dateComparator(date1, date2) {
    var date1Number = monthToComparableNumber(date1);
    var date2Number = monthToComparableNumber(date2);
  
    if (date1Number === null && date2Number === null) {
      return 0;
    }
    if (date1Number === null) {
      return -1;
    }
    if (date2Number === null) {
      return 1;
    }
  
    return date1Number - date2Number;
  }
  
  // eg 29/08/2004 gets converted to 20040829
  function monthToComparableNumber(date) {
    if (date === undefined || date === null || date.length !== 10) {
      return null;
    }
  
    var yearNumber = date.substring(6, 10);
    var monthNumber = date.substring(3, 5);
    var dayNumber = date.substring(0, 2);
  
    var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
    return result;
  }
  
  var gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      width: 170,
      sortable: true,
    },
  };

  
  // setup the grid after the page has finished loading
  $(document).ready(() => {
      localStorage.setItem("formType","");
            var createTourBtn1= document.querySelector("#createTourBtn1");
            var createTourBtn2= document.querySelector("#createTourBtn2");
            createTourBtn1.onclick=function (params) {
              window.location.href="/create_tour"
            }
            createTourBtn2.onclick=function (params) {
              window.location.href="/create_tour"
            }
          
            
            var gridDiv = document.querySelector('#myGrid');
            new agGrid.Grid(gridDiv, gridOptions);
          
          
          
            $.ajax({
              type: "GET",
              url: 'http://localhost:3001/tours',
              success: function (data) {
                var newData = [];
                Object.entries(data).map((tours) => {
                  newData.push(tours[1])
                })
          
          
                gridOptions.api.setRowData(newData);
          
              },
              error: function (errorThrown) {
                alert("failed to load tours ");
          
              }
            })
     
  
  })