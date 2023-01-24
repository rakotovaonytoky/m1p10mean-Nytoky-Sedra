const mongoose = require('mongoose');

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

module.exports= mongoose.model('TypeCar',typeCarSchema);