const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const depotCarSchema = mongoose.Schema(
    {
        // _id: Number,
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
    // {_id:false}
);
// depotCarSchema.plugin(AutoIncrement);
module.exports= mongoose.model('DepotCar',depotCarSchema);
