const mongoose = require('mongoose');
//midefinir type de données ao @N'ILAY user
const typeReparationSchema = mongoose.Schema(
    {
        reference:{
            type:Number,
            required:true
        },
        values: {
            type:String,
            required:true 
        },
        image:{
            type:String
        }
    }
);



module.exports= mongoose.model('TypeReparation',typeReparationSchema);
