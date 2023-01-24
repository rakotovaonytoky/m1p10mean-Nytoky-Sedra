var express = require('express');
var router = express.Router();
const Car = require('../models/car');
const TypeReparation = require('../models/typeReparation');
const CarController=require("../controller/car.controller")
const { authJwt } = require("../middlewares/"); 
const TypeCar=require("../models/typeCar");
const MarkCar=require("../models/markCar");
const Depot=require("../models/Depot");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
}


const addCar= (req,res) =>{
  console.log({...req.body}); 
  delete req.body._id;
  const vartypeCar = TypeCar.findOne({ "reference": req.body.typeCar });
  const varmarkCar = MarkCar.find({ "reference": req.body.markCar });
  vartypeCar.then((typeCarResponse) => {
    console.log("typecar:tyh", typeCarResponse);
    varmarkCar.then((markCarResult) => {
      console.log("typecar:tyh", markCarResult);  
      // const objectId = ObjectId(req.body.idUser);
      const car = new Car({
        typeCar: typeCarResponse,
        colorCar: req.body.colorCar,
        markCar: markCarResult,
        modelCar: req.body.modelCar,
        matricule: req.body.matricule,
        proprietaire: req.body.proprietaire,
        anneDeSortie: req.body.anneDeSortie,
        idUser: req.body.idUser  
      });
      // delete car.TypeCar._id;
      // delete car.MarkCar._id;
      car.save()
      .then(() =>{
        console.log('[INFO] voiture Enregistré');
        res.json(car.matricule)
      })
    .catch((error) => {
      // catch uniquekey for Mail
      
      console.log('[INFO] voiture non enregistré');
        errMsg = error.message;
        res.json({errMsg});
      });     
     // return res.json(car);
      
    })
    .catch((err) => {  res.status(404).json({message: err.message});})

  }).catch((err) => {res.status(405).json({message: err.message});})
  console.log("errrrrooooor");
}

router.post('/car',(req,res)=>{addCar(req,res)});


const addTypeReparation= (req,res ) =>{
  delete req.body._id;  
const { authJwt } = require("../middlewares"); 

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


    const DoDepot= (req,res ) =>{ 
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
              res.status(400).json(hisCar.matricule);
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

router.get("/markcar",[authJwt.verifyToken] ,CarController.getmarkCar);
router.get("/typecar",[authJwt.verifyToken], CarController.getTypeCar);


router.post("/carDepot",DoDepot);







module.exports = router;