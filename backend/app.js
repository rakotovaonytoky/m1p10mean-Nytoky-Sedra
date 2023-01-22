const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/users');
const carRouter = require('./routes/car');
//demande an'ilay moongose sinon misy error
 mongoose.set('strictQuery', true);

 //connexion base de donnée
mongoose.connect('mongodb+srv://sdm:sdm@garagens.tjp2yja.mongodb.net/testtoken?authSource=admin&replicaSet=atlas-6w90rk-shard-0&readPreference=primary&ssl=true',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => { console.log('Connexion à MongoDB réussie !'); initial()})
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());


app.use(cors());

app.use('/api',userRouter);
app.use('/api', carRouter);


const db = require("./models/index");
const Role = db.role;

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


module.exports = app;