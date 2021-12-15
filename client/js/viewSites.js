$(document).ready(() => {

var tourId=localStorage.getItem("tourId");
    $.ajax({
        type: "GET",
        url: 'http://localhost:3001/tours/' + tourId,
        success: function (data) {
        console.log(data["site"]);

        if(data["site"]){
            var columnDefs = [
                { field: 'siteName' },
                { field: 'countryName' },
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
           
                Object.entries(data.site).map((site) => {

                  newData.push(site[1])
                })
                
                gridOptions.api.setRowData(newData);
        } 
        else{
            alert("there is no sites for tour "+localStorage.getItem("tourId"))
            window.location.href="/toursList"
        }
            },
            error: function (errorThrown) {
                alert("failed to delete tour ");

            }

    })
});