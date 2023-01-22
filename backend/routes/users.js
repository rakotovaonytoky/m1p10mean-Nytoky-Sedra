var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const db = require("../models/index");
const config = require("../config/auth.config");
const { authJwt } = require("../middlewares"); 
const ROLES = db.ROLES;
const role=require('../models/role')
const User = db.user;
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
}

  router.post('/inscription',(req,res)=>{
    console.log({...req.body}); //mi_affiche ao @ console an'ilay  données recuperer
    delete req.body._id;  // asorina ilay id generer automatique inyy
    
    //mamorona instance anah user iray asiana le data
    const user =new User( {
      ...req.body
     });

    if(!(user.password===user.confirmPassword)){
      res.status(400).json({ message:'mot de passe non identique'})
    }
    else {
        if (req.body.roles) {
          for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
              res.status(400).send({
                message: `Failed! Role ${req.body.roles[i]} does not exist!`
              });
              return;
            }

          }
          role.find(
            {
                name: { $in: req.body.roles }
             },
              (err, roles) => {
                  if (err) {
                res.status(500).send({ message: err });
                return;
                } 
                user.roles = roles.map(role => role._id);
                //mi_save ilay données any anaty base (user.save), misy fonction pre-save any @ models user micrypt mdp avant save
                user.save()
                  .then(() =>{
                    console.log('[INFO] inscription reussi');
                    res.status(201).json({message:"Compte crée avec succés"})
                  })
                .catch((error) => {
                  // catch uniquekey for Mail
                  let errMsg;
                  if (error.code == 11000) {
                    errMsg = "L' "+Object.keys(error.keyValue)[0] + " existe déjà";
                  } else {
                    errMsg = error.message;
                  }
                  res.status(400).json({ statusText: "Bad Request", message: errMsg });
                  console.log('[INFO] Email existant!');
                  
                });
              }
           )
        } else {
                role.findOne({ name: "user" }, (err, role) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            user.roles = [role._id];
              user.save()
                      .then(() =>{
                        console.log('[INFO] inscription reussi');
                        res.status(201).json({message:"Compte crée avec succés"})
                      })
                    .catch((error) => {
                      // catch uniquekey for Mail
                      let errMsg;
                      if (error.code == 11000) {
                        errMsg = "L' "+Object.keys(error.keyValue)[0] + " existe déjà";
                      } else {
                        errMsg = error.message;
                      }
                      res.status(400).json({ statusText: "Bad Request", message: errMsg });
                      console.log('[INFO] Email existant!');
                      
                    });
                  
          });
        }

    }
  });

     //api login , migerer hoe valide ve ilay mail, ensuite hoe true ve mdp, mireturn données users izyy 
  router.post('/login', async (req,res) =>{
    try{
        User.findOne({
    username: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
      // ---------------------------
      
    } catch(err) {
     console.log('error : login ou mot de passe erronée');
      res.status(403).json({message:'login ou mot de passe erronée'})
    }
  });

  router.get('/users',  [authJwt.verifyToken],(req, res) => {
    User.find()
    .then(users => {
        console.log('[INFO] affichage reussi');
        res.status(200).json(users)})
    .catch(error =>{
        console.log('[INFO] erreur d affichage');
         res.status(400).json(error)});
    });

module.exports = router;
