
const Car = require('../models/car');
const Depot=require("../models/Depot");
const TypeReparation = require("../models/typeReparation");

const UNDEPOSIT_CAR = 0;
const WAIT_VALIDATION = 1;
const WAIT_REPARATION = 2;
const REPARATION_PROGRESS = 3;
const WAIT_CHECKOUT = 4;
const RECOVER_CAR = 5


exports.DoDepot= (req,res ) =>{ 
        const depot =new  Depot( {
          ...req.body
         });
  console.log({ depot }); 

  depot.save()
    .then((depot) => {
      //  res.status(200).json(element);
      const thecar = Car.findOne({ "_id": req.body.idCar });
      thecar.then((car) => {
         hisCar = car;
        hisCar.etat = 1;
        hisCar.save() 
              .then(() =>{
                console.log('[INFO] etatCar set to 1');
                res.status(200).json(depot);
              })
              .catch(err =>  res.status(500).json({message: err.message})); 
      })
        .catch(err =>  res.status(500).json({message: err.message}));
     })
    .catch((err) => {res.status(500).json({message: err.message})});

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
 Depot.find({idUser:req.params.idUser}).populate("idCar")
    .exec((err, depot) => {
      if (err) {
        return res.status(500).json({message:err.message});
      }
      return res.status(200).json(depot);
    });
}

exports.findDepotWaitValidationApi = (req, res) => {
  this.findDepotByType(WAIT_VALIDATION)
    .then(element => { return res.status(200).json(element);})
    .catch(err => {return res.status(500).json({message:err.message}); })
}

exports.findDepotWaitReparationApi = (req, res) => {
  this.findDepotByType(WAIT_REPARATION)
    .then(element => { return res.status(200).json(element);})
    .catch(err => {return res.status(500).json({message:err.message}); })
}

exports.findDepotReparationProgressApi = (req, res) => {
  this.findDepotByType(REPARATION_PROGRESS)
    .then(element => { return res.status(200).json(element);})
    .catch(err => {return res.status(500).json({message:err.message}); })
}

exports.findDepotWaitCheckoutApi = (req, res) => {
  this.findDepotByType(WAIT_CHECKOUT)
    .then(element => { return res.status(200).json(element);})
    .catch(err => {return res.status(500).json({message:err.message}); })
}



exports.findDepotByType = (etat) =>{
  return Depot.find({ etat: etat }).populate("idCar").populate("idUser"," name email");
}
  