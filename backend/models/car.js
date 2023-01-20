const mongoose = require('mongoose');
//midefinir type de données ao @N'ILAY user
const typeCarSchema = mongoose.Schema(
    {
        reference:{
            type:Number,
            required:true
        },
        values: {
            type:String,
            required:true 
        },
    }
);
const markCarSchema = mongoose.Schema(
    {
        reference:{
            type:Number,
            required:true
        },
        values : {
            type:String,
            required:true 
        },
    }
);

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
module.exports= mongoose.model('Car',carSchema);
