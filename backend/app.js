const express = require('express');
const Getconn = require('./controller/connexionDb');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/users');
const depotRouter = require('./routes/depot');
const carRouter = require('./routes/car');
const etatCarRouter=require('./routes/etatCar');
const indexRouter = require("./routes/index");
const path=require("path");
//demande an'ilay moongose sinon misy error
 //connexion base de donnée
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "views")));
Getconn.getConn();
app.use('/api',userRouter);
app.use('/api', carRouter);
app.use('/api', depotRouter);
app.use('/api', etatCarRouter);
app.use("/**", indexRouter);

module.exports = app;