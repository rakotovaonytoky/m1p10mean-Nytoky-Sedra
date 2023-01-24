const mongoose = require('mongoose');
const typeCarSchema = require('./typeCar').schema;
const markCarSchema = require('./markCar').schema;
const { Schema } = mongoose;
const Depot = require('./Depot');


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
            idUser : {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            etat : {
                type: Number,
                default: 0
            }
            }
        
);
module.exports = mongoose.model('Car', carSchema)


