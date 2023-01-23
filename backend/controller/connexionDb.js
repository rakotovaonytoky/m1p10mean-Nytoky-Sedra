const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
exports.getConn= () =>{
    mongoose.connect('mongodb+srv://sdm:sdm@garagens.tjp2yja.mongodb.net/testtoken?authSource=admin&replicaSet=atlas-6w90rk-shard-0&readPreference=primary&ssl=true',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => { console.log('Connexion à MongoDB réussie !'); })
    //initial()
    .catch(() => console.log('Connexion à MongoDB échouée !'));
    };