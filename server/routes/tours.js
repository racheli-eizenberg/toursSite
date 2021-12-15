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
        if (data===null) data = "{}";
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
    console.log("brfore")
    for (var key in o2) {
        console.log("check1", o1)
        console.log("check2", o2)
        o1[key] = o2[key];
    }
    return o1;
}
function validate(res,req)
{
    if (req.body.date&&!(validateDate(req.body.date,responseType="boolean"))) {
        res.status(400).send("required date format");
        return false;
    }
    if (req.body.duration&&!isPositiveInteger(parseFloat(req.body.duration))) {
        res.status(400).send("duration must be positive integer");
        return false;
    }
    if (req.body.id&&!isPositiveInteger(parseFloat(req.body.id))) {
        res.status(400).send("id must be positive integer");
        return false;
    }
    if (req.body.cost&&req.body.cost<=0) {
        res.status(400).send("cost must be positive number");
        return false;
    }
    
    return true;
}

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
           
            if(data[req.body.id])//if id exists
            {
               res.status(400).send("id already exists");
               return;
            }   
             // create a tour
             if(req.body.id===null||req.body.date===null||req.body.cost===null||req.body.duration===null) 
             {res.status(400).send("all fields are required");return;} 
            if(!validate(res,req))
                return;
            data[req.body.id] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('tour created');
                return;
            });
        },
            true);
    },

    // UPDATE
    update_tour: function (req, res) {
        
        readFile(data => {

            // add the new tour
            const tourId = req.params["id"];
            
            if(req.body.id)
            {
                res.status(400).send("can't update id");
                return;
            }
            
            if(!validate(res,req))
                return;
            if (data[tourId]) {
                var output = {};
                output = jsonConcat(output, data[tourId]);
                output = jsonConcat(output, req.body);
                data[tourId] = output;
            }

            else {res.status(400).send("id doesn't exist");return;}
            

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
                
                if(req.body.index===null||req.body.siteDetails===null||req.body.siteDetails.siteName===null||req.body.siteDetails.countryName===null ) 
                { 
                    res.status(400).send("all fields are required");
                    return;
                }
                
                else if((req.body.index)<0)
                {
                    res.status(400).send("invalid index");
                    return;
                }
                    
                else if (!data[tourId]["site"])
                        {data[tourId]["site"]=[];                             
                        data[tourId]["site"].splice(req.body.index,0,req.body.siteDetails) }
                else       
                    data[tourId]["site"].splice(req.body.index,0,req.body.siteDetails)
            }
            else {res.status(400).send("tour id doesn't exist");return;};

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
                console.log(expiryDate)
                if(req.body.id) {
                    res.status(400).send("can't update id");
                    return;
                }
                
                if(startDate&&startDate>expiryDate&&expiryDate) {
                    res.status(400).send("expiry date can't be before start date");
                    return;
                }
                if (discountPercentage&&isNaN(discountPercentage)||Number(discountPercentage)<0||Number(discountPercentage)>100) {
                    res.status(400).send("discountPercentage must be valid percentage");
                    return;
                }
                if(data[req.params.id]["date"]<expiryDate) {
                    res.status(400).send("expiry date can't after the tour begins");
                    return;
                }
                if(codeCoupon===null) {
                    res.status(400).send("code cupon required");
                    return;
                }
                if (startDate&&!(validateDate(startDate,responseType="boolean"))||expiryDate&&!(validateDate(expiryDate,responseType="boolean")))
                {
                    res.status(400).send("date must be in date format");
                    return; 
                }
                if (data[tourId]["coupon"]&&data[tourId]["coupon"][`cupon${codeCoupon}`])//if coupon exists update
                {
                    console.log(codeCoupon)
                    data[tourId]["coupon"][`cupon${codeCoupon}`]= jsonConcat(data[tourId]["coupon"][`cupon${codeCoupon}`], req.body);
                   
                }
                else//create a new coupon
                {
                    if(startDate===null||expiryDate===null||discountPercentage===null ) //for creation all fields are required
                    {
                        res.status(400).send("all fields are required");
                        return;
                    }
                       
                    else{
                            if (!data[tourId]["coupon"])
                            { 
                                console.log("new")
                                data[tourId]["coupon"]={};
                                   
                            }    
                            data[tourId]["coupon"]=Object.assign({}, data[tourId]["coupon"],{[`cupon${codeCoupon}`]:req.body})
                            
                           
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
            if(data[tourId]===null)
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

            if(data[tourId]&&data[tourId]["coupon"]&&data[tourId]["coupon"][`cupon${codeCoupon}`])
            {
                delete data[tourId]["coupon"][`cupon${codeCoupon}`];
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