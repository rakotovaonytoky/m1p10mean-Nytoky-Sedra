const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const db = require("../models/index");
const Role = db.role;


exports.getConn= () =>{
    mongoose.connect('mongodb+srv://sdm:sdm@garagens.tjp2yja.mongodb.net/testtoken?authSource=admin&replicaSet=atlas-6w90rk-shard-0&readPreference=primary&ssl=true',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
      .then(() => {
        console.log('Connexion à MongoDB réussie !');
         initial();
      })
  
    .catch(() => console.log('Connexion à MongoDB échouée !'));
};

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

