


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

    
    //let modalBtn = document.getElementById("modal-btn")
    let modal = document.querySelector(".modal")
    let modal_content = document.querySelector(".modal-content")
    let update_form = document.querySelector(".updateTour")
    modal_content.appendChild(update_form);
    let closeBtn = document.querySelector(".close-btn")
    
    
      modal.style.display = "block"
    let updateBtn=document.getElementById("updateBtn");

   
   
    updateBtn.onclick=function(){
      
     

      $.ajax({
        type: "PUT",
        url: 'http://localhost:3001/tours/' + params.data.id,
        contentType: "application/json",
        dataType: "json",
        data:JSON.stringify({
          date:  $("#start_date").val().split('-').reverse().join('-'),
          cost: $("#cost").val(),
          duration: $("#duration").val(),
       
      }),
        
        
        success: function (data) {
  
         
          console.log(data)
        },
        error: function (errorThrown) {
          alert("failed to update tour ");
  
        }
      })
    }
    
    closeBtn.onclick = function(){
      modal.style.display = "none"
    }
    window.onclick = function(e){
      if(e.target == modal){
        modal.style.display = "none"
      }
    }
  }
    return btn;

}
const addSiteRendererComponent = () => {
  var btn = document.createElement("button");
  btn.innerHTML = "addSite to Tour";


  return btn;

}
const addCouponRendererComponent = () => {
  var btn = document.createElement("button");
  btn.innerHTML = "addCoupon Tour"
  return btn;

}
var columnDefs = [
  { field: 'id', sortable: true },
  { field: 'date', sortable: true, comparator: dateComparator },
  { field: 'duration', sortable: true },
  { field: 'cost', sortable: true },
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
