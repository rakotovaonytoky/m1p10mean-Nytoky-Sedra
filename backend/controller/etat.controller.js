
const Car = require('../models/car');
const Depot=require("../models/Depot");

//mila misy idDepot raisiny zanyy
exports.ValidateDepot= (req,res ) =>{ 
        const depot =Depot.findOne({ "_id": req.params.idDepot });
  console.log({ depot }); 
  depot.then((depot) => {
        hisDepot = depot;
        hisDepot.etat = 2;
        hisDepot.save() 
         .then(() =>{
           console.log('[INFO] etatDepot set to 2');
                const thecar = Car.findOne({ "_id": hisDepot.idCar });
                thecar.then((car) => {
                hisCar = car;
                hisCar.etat = 2;
                hisCar.save() 
                    .then(() =>{
                    console.log('[INFO] etatCar set to 2');
                    res.status(200).json(hisCar);
                })
                .catch(err =>  res.status(400).json({message: err.message})); 
         })
        .catch(err =>  res.status(401).json({message: err.message}));
    })
    .catch((err) => {res.status(402).json({message: err.message})});

})
.catch((err) => {res.status(403).json({message: err.message})}); 
}









//mila misy idDepot raisiny zanyy
exports.DoRepairs= (req,res ) =>{ 
    const depot =Depot.findOne({ "_id": req.params.idDepot });
console.log({ depot }); 
depot.then((depot) => {
    hisDepot = depot;
    hisDepot.etat = 3;
    hisDepot.save() 
     .then(() =>{
       console.log('[INFO] etatDepot set to 3');
            const thecar = Car.findOne({ "_id": hisDepot.idCar });
            thecar.then((car) => {
            hisCar = car;
            hisCar.etat = 3;
            hisCar.save() 
                .then(() =>{
                console.log('[INFO] etatCar set to 3');
                res.status(200).json(hisCar);
            })
            .catch(err =>  res.status(400).json({message: err.message})); 
     })
    .catch(err =>  res.status(401).json({message: err.message}));
})
.catch((err) => {res.status(402).json({message: err.message})});

})
.catch((err) => {res.status(403).json({message: err.message})}); 
}




//mila misy idDepot raisiny zanyy
exports.Terminer= (req,res ) =>{ 
    const depot =Depot.findOne({ "_id": req.params.idDepot });
console.log({ depot }); 
depot.then((depot) => {
    hisDepot = depot;
    hisDepot.etat = 4;
    hisDepot.save() 
     .then(() =>{
       console.log('[INFO] etatDepot set to 4');
            const thecar = Car.findOne({ "_id": hisDepot.idCar });
            thecar.then((car) => {
            hisCar = car;
            hisCar.etat = 4;
            hisCar.save() 
                .then(() =>{
                console.log('[INFO] etatCar set to 4');
                res.status(200).json(hisCar);
            })
            .catch(err =>  res.status(400).json({message: err.message})); 
     })
    .catch(err =>  res.status(401).json({message: err.message}));
})
.catch((err) => {res.status(402).json({message: err.message})});

})
.catch((err) => {res.status(403).json({message: err.message})}); 
}



//mila misy idDepot raisiny zanyy
exports.Facturer= (req,res ) =>{ 
    const depot =Depot.findOne({ "_id": req.params.idDepot });
console.log({ depot }); 
depot.then((depot) => {
    hisDepot = depot;
    hisDepot.etat = 5;
    hisDepot.save() 
     .then(() =>{
       console.log('[INFO] etatDepot set to 5');
            const thecar = Car.findOne({ "_id": hisDepot.idCar });
            thecar.then((car) => {
            hisCar = car;
            hisCar.etat = 5;
            hisCar.save() 
                .then(() =>{
                console.log('[INFO] etatCar set to 5');
                res.status(200).json(hisCar);
            })
            .catch(err =>  res.status(400).json({message: err.message})); 
     })
    .catch(err =>  res.status(401).json({message: err.message}));
})
.catch((err) => {res.status(402).json({message: err.message})});

})
.catch((err) => {res.status(403).json({message: err.message})}); 
}


//mila misy idDepot raisiny zanyy
exports.EnFinir= (req,res ) =>{ 
    const depot =Depot.findOne({ "_id": req.params.idDepot });
console.log({ depot }); 
depot.then((depot) => {
    hisDepot = depot;
    hisDepot.etat = 6;
    hisDepot.save() 
     .then(() =>{
       console.log('[INFO] fini: etatDepot set to 6');
            const thecar = Car.findOne({ "_id": hisDepot.idCar });
            thecar.then((car) => {
            hisCar = car;
            hisCar.etat = 0;
            hisCar.save() 
                .then(() =>{
                console.log('[INFO] etatCar reinitaliser');
                res.status(200).json(hisCar);
            })
            .catch(err =>  res.status(400).json({message: err.message})); 
     })
    .catch(err =>  res.status(401).json({message: err.message}));
})
.catch((err) => {res.status(402).json({message: err.message})});

})
.catch((err) => {res.status(403).json({message: err.message})}); 
}

