const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const depotCarSchema = mongoose.Schema(
    {
        _id: Number,
        idUser:  {
            type: String,
            default: 0
        },
        idCar:   {
            type: String,
            default: 0
        },
        etat:  {
            type: Number,
            default: 0
        }
    },{_id:false}
);
 
depotCarSchema.plugin(AutoIncrement);
module.exports= mongoose.model('depotCar',depotCarSchema);
