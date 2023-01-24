
const Car = require('../models/car');
const Depot=require("../models/Depot");
exports.DoDepot= (req,res ) =>{ 
        const depot =new  Depot( {
          ...req.body
         });
         console.log({depot}); 
         depot.save()
            .then(() =>{
              console.log('[INFO] voiture deposé!');
              const thecar = Car.findOne({ "_id": req.body.idCar });
        
              thecar.then((car) => {
                //console.log("car:tyh", car);
                   hisCar = car;
                    hisCar.etat=1;
              hisCar.save() 
              .then(() =>{
                console.log('[INFO] etatCar set to 1');
                res.status(200).json(hisCar.matricule);
              })
            .catch((error) => {
              // catch uniquekey for Mail
                errMsg = error.message;
                res.status(400).json(error);
              }); 
            })
          .catch((error) => {
            // catch uniquekey for Mail
              errMsg = error.message;
              res.status(400).json(error);
            }); 
          }) .catch((error) => {
            // catch uniquekey for Mail
              errMsg = error.message;
              res.status(400).json(error)});
          }
  