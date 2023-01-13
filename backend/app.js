const express = require('express');
const app = express();
const mongoose = require('mongoose');
 mongoose.set('strictQuery', true);
// const Thing =require('./models/thing');
mongoose.connect('mongodb+srv://sdm:sdm@garagens.tjp2yja.mongodb.net/test?authSource=admin&replicaSet=atlas-6w90rk-shard-0&readPreference=primary&ssl=true',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

module.exports = app;