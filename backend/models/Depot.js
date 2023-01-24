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
            default: 0
        }
    },
    // {_id:false}
);
// depotCarSchema.plugin(AutoIncrement);
module.exports= mongoose.model('depotCar',depotCarSchema);
