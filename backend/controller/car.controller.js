const MarkCar = require("../models/markCar");
const TypeCar=require("../models/typeCar");
// const car=car.

exports.getmarkCar= (req,res ) =>{
  MarkCar.find({},{"reference":1,"values":1,"_id":0})
      .then((markCar) =>{
       
          return res.status(200).json({ markCar });
      })
    .catch((error) => {
      // catch uniquekey for Mail
        errMsg = error.message;
        res.status(400).json({ message : errMsg});
      }); 
}
exports.getTypeCar= (req,res ) =>{
  TypeCar.find({},{"reference":1,"values":1,"_id":0})
      .then((typeCar) =>{
       
          return res.status(200).json({ typeCar });
      })    
    .catch((error) => {
      // catch uniquekey for Mail
        errMsg = error.message;
        res.status(400).json({ message : errMsg});
      }); 
}



exports.getCarByUser=(res,idUser) =>{
  Car.find({"user._id":idUser},{"_id":0})
  .then(cars => {
    console.log('[INFO] affichage reussi');
    res.status(200).json(cars)})
.catch(error =>{
    console.log('[INFO] erreur d affichage');
     res.status(400).json(error)
    });
}