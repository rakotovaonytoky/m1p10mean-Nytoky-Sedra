const mongoose = require('mongoose');
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
module.exports= mongoose.model('MarkCar',markCarSchema);
