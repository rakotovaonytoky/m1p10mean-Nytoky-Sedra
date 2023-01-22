const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/users');
const carRouter = require('./routes/car');
//demande an'ilay moongose sinon misy error
 mongoose.set('strictQuery', true);

 //connexion base de donnée
mongoose.connect('mongodb+srv://sdm:sdm@garagens.tjp2yja.mongodb.net/test?authSource=admin&replicaSet=atlas-6w90rk-shard-0&readPreference=primary&ssl=true',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());


app.use(cors());

app.use('/api',userRouter);
app.use('/api',carRouter);

module.exports = app;