const fs = require('fs');
var validateDate = require("validate-date");
var isPositiveInteger = require('is-positive-integer')

// variables
const dataPath = './server/data/tours.json';

//helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (!data) data = "{}";
        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            console.log(err);
        }

        callback();
    });
};

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}
// function addToSiteList(siteDetail, existingSite) {
//     console.log(siteDetail, existingSite);
//     //let list = new LinkedList(siteDetail)
// }
module.exports = {

    //READ
    get_tours: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else
                res.send(!data ? JSON.parse("{}") : JSON.parse(data));
        });
    },
    get_tour: function (req, res) {

        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else {
                var tourId = req.params["id"];
                var dataObject = JSON.parse(data)
                if (!dataObject[tourId])res.status(400).send("no such tour");
                else{
                    res.send(!data ? JSON.parse("{}") : dataObject[tourId]);
                }
                    
            }
        });
    },


    // CREATE
    create_tour: function (req, res) {

        readFile(data => {
            // create a tour
            if(!req.body.id||!req.body.date||!req.body.cost||!req.body.duration) 
                  {res.status(400).send("all fields are required");return;} 
            if(data[req.body.id])//if id exists
            {
               res.status(400).send("id already exists");return;
            }   
            if (!(validateDate(req.body.date,responseType="boolean",dateFormat="dd/mm/yyyy"))) {
                res.status(400).send("required date format");return;
            }
            if (!isPositiveInteger(parseFloat(req.body.duration))) {
                res.status(400).send("duration must be positive integer");return;
            }
            if (!isPositiveInteger(parseFloat(req.body.id))) {
                res.status(400).send("id must be positive integer");return;
            }
            if (req.body.cost<0) {
                res.status(400).send("cost must be positive number");return;
            }
            data[req.body.id] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('tour created');
            });
        },
            true);
    },

    // UPDATE
    update_tour: function (req, res) {
        readFile(data => {

            // add the new tour
            const tourId = req.params["id"];
            if (data[tourId]) {
                var output = {};
                output = jsonConcat(output, data[tourId]);
                output = jsonConcat(output, req.body);


                //  console.log("output",output);
                data[tourId] = output;
            }

            else {res.sendStatus(400);return;}


            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`tours id:${tourId} updated`);
            });
        },
            true);
    },
    AddSiteToTourpath: function(req, res) {
        readFile(data => {

            // add the new tour
            const tourId = req.params["id"];

            if (data[tourId])
            { 
                if(!req.body.index||!req.body.siteDetails||!req.body.siteDetails.siteName||!req.body.siteDetails.countryName ) 
                    res.status(400).send("all fields are required");
                else if(req.body.index<0)
                    res.status(400).send("invalid index");
                else if (!data[tourId]["sites"])
                        {data[tourId]["sites"]=[];                             
                        data[tourId]["sites"].splice(req.body.index,0,req.body.siteDetails) }
                else       
                    data[tourId]["sites"].splice(req.body.index,0,req.body.siteDetails)
            }
            else {res.status(400).send("tour doesn't exist");return;};

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`tours id:${tourId} updated`);
           }
           );
        },
            true);
    },   
    AddCuponToTour: function(req,res) 
    {
        readFile(data => {

            // add the new tour
            const tourId = req.params["id"];

            if (data[tourId])
            { 
                var codeCoupon=req.body.codeCoupon,
                startDate=req.body.startDate,
                expiryDate=req.body.expiryDate,
                discountPercentage=req.body.discountPercentage;
                if(!codeCoupon) 
                    res.status(400).send("code cupon required");
                else if (data[tourId][`cupon${codeCoupon}`])//if coupon exists update
                {
                    data[tourId][`cupon${codeCoupon}`]= jsonConcat(data[tourId][`cupon${codeCoupon}`], req.body);
                }
                else//create a new coupon
                {
                    if(!startDate||!expiryDate||!discountPercentage ) //for creation all fields are required
                        res.status(400).send("all fields are required");
                    else{
                        data[tourId][`cupon${codeCoupon}`]={"codeCoupon":codeCoupon,"startDate":startDate,"expiryDate":expiryDate,"discountPercentage":discountPercentage} 
                    }   
                }
            }
            else {res.status(400).send("tour doesn't exist");return;}

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`tours id:${tourId} updated with coupon ${codeCoupon}  `);
           }
           );
        },
            true);
    
},
    // DELETE
    delete_tour: function (req, res) {

        readFile(data => {

            // add the new tour
            const tourId = req.params["id"];
            if(!data[tourId])
                {res.status(400).send("not found");return;}
                
            else
                delete data[tourId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`tour :${tourId} removed`);
            });
        },
            true);
    },
    deleteCopunFromTour: function(req,res) 
    {
        readFile(data => {

            // add the new tour
            const tourId = req.params["id"];         
            const codeCoupon = req.params["codeCoupon"];
           
            if(data[tourId]&&data[tourId][`cupon${codeCoupon}`])
            {
                delete data[tourId][`cupon${codeCoupon}`];
            }
            else
                {res.status(400) .send("not found");return;}

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`cupon :${codeCoupon} removed from tour:${tourId} `);
            });
        },
            true);
    }

};
