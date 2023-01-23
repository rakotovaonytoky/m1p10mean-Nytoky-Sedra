const mongoose = require('mongoose');
const typeCarSchema = require('./typeCar').schema;
const markCarSchema = require('./markCar').schema;



const carSchema = mongoose.Schema(
         {
             typeCar:[typeCarSchema],
             colorCar:{
                 type: String,
                 required:true
             },
             markCar:[markCarSchema],
             modelCar:{
                 type:String
             },
             matricule: {
                 type: String,
                 required:true
             },
             proprietaire: {
                 type: String,
             },
             anneDeSortie:{
                 type:String
             },
            }
);
module.exports= mongoose.model('Car',carSchema)

