
const Car = require('../models/car');
const Depot=require("../models/Depot");
const TypeReparation=require("../models/typeReparation");
exports.DoDepot= (req,res ) =>{ 
        const depot =new  Depot( {
          ...req.body
         });
  console.log({ depot }); 

  depot.save()
    .then((element) => {
       res.status(200).json(element);
     })
    .catch((err) => {
       res.status(500).json({message: err.message});
     });

        //  depot.save()
        //     .then(() =>{
        //       console.log('[INFO] voiture deposé!');
        //       const thecar = Car.findOne({ "_id": req.body.idCar });
        
        //       thecar.then((car) => {
        //         //console.log("car:tyh", car);
        //            hisCar = car;
        //             hisCar.etat=1;
        //       hisCar.save() 
        //       .then(() =>{
        //         console.log('[INFO] etatCar set to 1');
        //         res.status(200).json(hisCar.matricule);
        //       })
        //     .catch((error) => {
        //       // catch uniquekey for Mail
        //         errMsg = error.message;
        //         res.status(400).json(error);
        //       }); 
        //     })
        //   .catch((error) => {
        //     // catch uniquekey for Mail
        //       errMsg = error.message;
        //       res.status(400).json(error);
        //     }); 
        //   }) .catch((error) => {
        //     // catch uniquekey for Mail
        //       errMsg = error.message;
        //       res.status(400).json(error)});
        
 
}
 
exports.findTypeReparation = (reference) =>{
  TypeReparation.findOne({ reference: reference })
    .then(element => {
      return element;
     })
    .catch(err => {
         throw new Error(err.message);
    })
}

exports.findDepotByUserApi = (req, res) => {
  console.log(req.params.idUser);
 Depot.find({idUser:req.params.idUser}).populate("idCar")
    .exec((err, depot) => {
      if (err) {
        return res.status(500).json({message:err.message});
      }
      return res.status(200).json(depot);
    });
}

exports.findDepotByUser = (idUser) =>{
  Depot.find({ 'idCar.idUser': idUser }).populate("idCar")
    .exec((err, depot) => {
      if (err) {
        throw err;
      }
      return depot;
    });
    
}
  