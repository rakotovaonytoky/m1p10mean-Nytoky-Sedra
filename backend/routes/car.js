var express = require('express');
var router = express.Router();
const Car = require('../models/car');
const TypeReparation = require('../models/typeReparation');
const CarController=require("../controller/car.controller")
const TypeCar=require("../models/typeCar");
const MarkCar=require("../models/markCar");

const addCar= (req,res) =>{
  console.log({...req.body}); 
  delete req.body._id;
  const vartypeCar = TypeCar.findOne({"reference":req.body.typeCar});
  const varmarkCar = MarkCar.find({"reference":req.body.markCar},{"reference":0,"values":1,"_id":0});
  const car =new Car( {
    typeCar:[{
      reference: req.body.typeCar,
      values:vartypeCar.values
    }],
    colorCar:req.body.colorCar,
    markCar:[{
      reference: req.body.typeCar,
      values:varmarkCar.values
     }],
    modelCar:req.body.modelCar,
    matricule: req.body.matricule,
    proprietaire: req.body.proprietaire,
    anneDeSortie:req.body.anneDeSortie,
    idUser : req.body.idUser
  //  });
  //  car.typeCar.push(vartypeCar.values);
   
   console.log('vitako carcarcar'+vartypeCar.values);
   console.log('vitako objet'+car);
   
   car.save()
      .then(() =>{
        console.log('[INFO] voiture Enregistré');
        res.json(car.matricule)
      })
    .catch((error) => {
      // catch uniquekey for Mail
        errMsg = error.message;
        res.json(error);
      });     
    }
router.post('/car',(req,res)=>{addCar(req,res)});


const addTypeReparation= (req,res ) =>{
  delete req.body._id;  
  const typeReparation =new TypeReparation( {
    ...req.body
   });
   console.log({...req.body}); 
   typeReparation.save()
      .then(() =>{
        console.log('[INFO] voiture Enregistré');
        res.status(201).json(typeReparation)
      })
    .catch((error) => {
      // catch uniquekey for Mail
        errMsg = error.message;
        res.status(400).json(error);
      }); 
    }
 router.post('/AddsuggestRepairs',(req,res)=>{addTypeReparation(req,res)});

router.get('/suggestRepairs', (req, res) => {
  TypeReparation.find({},{"reference":1,"values":1,"image":1,"_id":0})
.then(typeReparations => {
    console.log('[INFO] affichage reussi');
    
    res.status(200).json({typeReparations})})
.catch(error =>{
    console.log('[INFO] erreur d affichage');
     res.status(400).json(error)});
});

router.get("/typecar", CarController.getTypeCar);

router.get("/markcar", CarController.getmarkCar);

module.exports = router;