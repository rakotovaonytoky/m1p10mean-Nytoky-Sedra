
const Car = require('../models/car');
const Depot=require("../models/Depot");
const TypeReparation = require("../models/typeReparation");

const UNDEPOSIT_CAR = 0;
const WAIT_VALIDATION = 1;
const WAIT_REPARATION = 2;
const REPARATION_PROGRESS = 3;
const REPARATION_DONE = 4;
const CHECKOUT = 5;
const SORTIE = 0;

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

exports.findDepotReparationDoneApi = (req, res) => {
  this.findDepotByType(REPARATION_DONE)
    .then(element => { return res.status(200).json(element);})
    .catch(err => {return res.status(500).json({message:err.message}); })
}

exports.findDepotCheckoutApi = (req, res) => {
  this.findDepotByType(CHECKOUT)
    .then(element => { return res.status(200).json(element);})
    .catch(err => {return res.status(500).json({message:err.message}); })
}

exports.findDepotByType = (etat) =>{
  return Depot.find({ etat: etat }).populate("idCar").populate("idUser"," name email");
}
exports.findDepotById = (req, res) => {
  Depot.findById(req.params.idDepot).populate("idCar").populate("idUser", " name email")
    .then(element => { return res.status(200).json(element) })
  .catch(err => {return res.status(500).json({message:err.message})})
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

exports.findepotByUserUnDepot= (req,res)=>{
Depot.find({idUser:req.params.idUser,etat: UNDEPOSIT_CAR}).populate("idCar")
    .exec((err, depot) => {
      if (err) {
        return res.status(500).json({message:err.message});
      }
      return res.status(200).json(depot);
    });
}
exports.findepotByUserWaitValidation= (req,res)=>{
Depot.find({idUser:req.params.idUser,etat: WAIT_VALIDATION}).populate("idCar")
    .exec((err, depot) => {
      if (err) {
        return res.status(500).json({message:err.message});
      }
      return res.status(200).json(depot);
    });
}
exports.findepotByUserWaitReparation= (req,res)=>{
Depot.find({idUser:req.params.idUser,etat: WAIT_REPARATION}).populate("idCar")
    .exec((err, depot) => {
      if (err) {
        return res.status(500).json({message:err.message});
      }
      return res.status(200).json(depot);
    });
}
exports.findepotByUserReparationProgress= (req,res)=>{
Depot.find({idUser:req.params.idUser,etat: REPARATION_PROGRESS}).populate("idCar")
    .exec((err, depot) => {
      if (err) {
        return res.status(500).json({message:err.message});
      }
      return res.status(200).json(depot);
    });
}
  
exports.findepotByUserReparationDone= (req,res)=>{
Depot.find({idUser:req.params.idUser,etat: REPARATION_DONE}).populate("idCar")
    .exec((err, depot) => {
      if (err) {
        return res.status(500).json({message:err.message});
      }
      return res.status(200).json(depot);
    });
}

exports.findepotByUserCheckout= (req,res)=>{
Depot.find({idUser:req.params.idUser,etat: CHECKOUT}).populate("idCar")
    .exec((err, depot) => {
      if (err) {
        return res.status(500).json({message:err.message});
      }
      return res.status(200).json(depot);
    });
}
  