const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/users');
const carRouter = require('./routes/car');
const Getconn = require('./controller/connexionDb');
//demande an'ilay moongose sinon misy error
 //connexion base de donnée
app.use(express.json());
app.use(cors());
Getconn.getConn();
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