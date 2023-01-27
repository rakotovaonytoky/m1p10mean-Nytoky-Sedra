const express = require('express');
const Getconn = require('./controller/connexionDb');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/users');
const depotRouter = require('./routes/depot');
const carRouter = require('./routes/car');
const etatCarRouter=require('./routes/etatCar');

//demande an'ilay moongose sinon misy error
 //connexion base de donnée
app.use(express.json());
app.use(cors());
app.use(express.static("front-garage-ns"));
Getconn.getConn();
app.use('/api',userRouter);
app.use('/api', carRouter);
app.use('/api', depotRouter);
app.use('/api', etatCarRouter);

module.exports = app;