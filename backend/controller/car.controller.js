const car = require("../models");
// const car=car.

// exports.getTypeCar= (req,res ) =>{
//   delete req.body._id;  
//   const typeReparation =new TypeReparation( {
//     ...req.body
//    });
//    console.log({...req.body}); 
//    typeReparation.save()
//       .then(() =>{
//         console.log('[INFO] voiture Enregistré');
//         res.status(201).json(typeReparation)
//       })
//     .catch((error) => {
//       // catch uniquekey for Mail
//         errMsg = error.message;
//         res.status(400).json(error);
//       }); 
//     }