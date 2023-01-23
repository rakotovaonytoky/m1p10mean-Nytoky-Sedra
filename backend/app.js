const express = require('express');
const Getconn = require('./controller/connexionDb');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/users');
const carRouter = require('./routes/car');

//demande an'ilay moongose sinon misy error
 //connexion base de donnée
app.use(express.json());
app.use(cors());
Getconn.getConn();
app.use('/api',userRouter);
app.use('/api', carRouter);



module.exports = app;