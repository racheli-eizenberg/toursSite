
$(document).ready(() => {

    const deleteRendererComponent = (params) => {

        var btn = document.createElement("button");
        btn.innerHTML = "Delete Coupon";
        // btn.setAttribute( "tourId", tourId );
        btn.onclick = function (e) {
          $.ajax({
            type: "DELETE",
            url: 'http://localhost:3001/tours/deleteCoupun/' + localStorage.getItem("tourId")+'/'+params.data.codeCoupon,
            success: function (data) {
      
              window.location.reload();
      
            },
            error: function (errorThrown) {
              alert("failed to delete coupon ");
      
            }
          })
        };
        return btn;
      
      }
    var tourId=localStorage.getItem("tourId");
        $.ajax({
            type: "GET",
            url: 'http://localhost:3001/tours/' + tourId,
            success: function (data) {
            
    
            if(data["coupon"]){
                var columnDefs = [
                    { field: 'codeCoupon' },
                    { field: 'startDate' },
                    { field: 'expiryDate' },
                    { field: 'discountPercentage' },
                    { field: "Delete",
                        cellRenderer: deleteRendererComponent,
                        cellRendererParams: {
                            // pass the field value here
                        }
                    }
                ];
                var gridOptions = {
                    columnDefs: columnDefs,
                    defaultColDef: {
                        width: 170,
                        sortable: true,
                    },
                };
                var gridDiv = document.querySelector('#myGrid');
                new agGrid.Grid(gridDiv, gridOptions);
                var newData = [];
                
               
                    Object.entries(data.coupon).map((coupon) => {
                        newData.push(coupon[1])
                    })
                    
                    gridOptions.api.setRowData(newData);
            } 
            else{
                alert("there is no coupon for tour "+localStorage.getItem("tourId"))
                window.location.href="/toursList"
            }
                },
                error: function (errorThrown) {
                    alert("failed to delete tour ");
    
                }
    
        })
    });