const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const depotCarSchema = mongoose.Schema(
    {
        idCar:   {           
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car"
        },
        etat:  {
            type: Number,
            default: 1
        },
        date: {
            type:Date,
            required: true,
            default:new Date()
        },
        description: {
            type: String,
            default: ""
        },
        idtypeReparation: [{
            reference: {
                type: Number,
            },
            values: {
                type: String,
            }
        }]
    },
   
);

module.exports= mongoose.model('DepotCar',depotCarSchema);
