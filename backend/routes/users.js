var express = require('express');
var router = express.Router();
const User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

  router.post('/inscription',(req,res)=>{
    console.log({...req.body}); //mi_affiche ao @ console an'ilay  données recuperer
    delete req.body._id;  // asorina ilay id generer automatique inyy
    
    //mamorona instance anah user iray asiana le data
    const user =new User( {
      ...req.body
     });
    // console.log('1er mdp: '+user.password+'\n 2eme mdp: '+user.confirmPassword);
    if(!(user.password===user.confirmPassword)){
      console.log('password: '+user.password+'\nconfirmPassword : '+user.confirmPassword+'\n[INFO] MDP non identiques');
      res.status(400).json({
        message:'mot de passe non identique'
      })
    }
    else {
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
  });

     //api login , migerer hoe valide ve ilay mail, ensuite hoe true ve mdp, mireturn données users izyy 
  router.post('/login', async (req,res) =>{
    try{
      console.log('[INFO] test login');
      const userData = await User.findOne({email: req.body.email});//manao select * where email = email
      const user = await User.checkUser(userData,req.body.password);//manao check hoe mi_existe ve ilay mail ary marina ve mdp
      res.json({user :user.email});
      console.log('[INFO]  utilisateur valide \n[INFO]  connecté en tant que '+user.email);
       // manome res an'le data user
    } catch(err) {
     console.log('error : login ou mot de passe erronée');
      res.status(403).json({message:'login ou mot de passe erronée'})
    }
  });

  router.get('/users', (req, res) => {
    User.find()
    .then(users => {
        console.log('[INFO] affichage reussi');
        res.status(200).json(users)})
    .catch(error =>{
        console.log('[INFO] erreur d affichage');
         res.status(400).json(error)});
    });

module.exports = router;
