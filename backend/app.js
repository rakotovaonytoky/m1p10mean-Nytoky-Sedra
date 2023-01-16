const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');


//demande an'ilay moongose sinon misy error
 mongoose.set('strictQuery', true);

 //connexion base de donnée
mongoose.connect('mongodb+srv://sdm:sdm@garagens.tjp2yja.mongodb.net/test?authSource=admin&replicaSet=atlas-6w90rk-shard-0&readPreference=primary&ssl=true',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  //afahana mi-manipule json
app.use(express.json());

//ialana @n'ilay error anah
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


//api inscription, insertion anah nouvelle utilisateur
  app.post('/inscription',(req,res,next)=>{
    console.log({...req.body}); //mi_affiche ao @ console an'ilay  données recuperer
    delete req.body._id;  // asorina ilay id generer automatique inyy
    
    //mamorona instance anah user iray asiana le data
    const user =new User( {
      ...req.body
    });
    console.log('1er mdp: '+user.password+'\n 2eme mdp: '+user.confirmPassword);
    if(!(user.password===user.confirmPassword)){
      console.log('tsy poinsa annn');
      res.status(400).json({
        message:'mot de passe non identique'
      })
    }
    else {
   //mi_save ilay données any anaty base (user.save), misy fonction pre-save any @ models user micrypt mdp avant save
      user.save()
        .then(() =>{
          console.log('inscription reussi');
          res.status(201).json({
          message:'utilisateur enregistré'
          })
        })
      .catch(() =>{
        console.log('utilisateur non enregistré');
        error => res.status(400).json( error)});
    
    }
  });

//maka data an'ny users rehetraaa
  app.get('/users', (req, res, next) => {
    User.find()
    .then(users => {
        console.log('affichage reussi');
        res.status(200).json(users)})
    .catch(error =>{
        console.log('erreur d affichage');
         res.status(400).json(error)});
    });



   //api login , migerer hoe valide ve ilay mail, ensuite hoe true ve mdp, mireturn données users izyy 
  app.post('/login', async (req,res,next) =>{
    try{
      const userData = await User.findOne({email: req.body.email});//manao select * where email = email
      const user = await User.checkUser(userData,req.body.password);//manao check hoe mi_existe ve ilay mail ary marina ve mdp
      res.send(user);
      console.log('utilisateur valide \n connecté en tant que '+user.email);
       // manome res an'le data user
    } catch(e) {
      console.log(e);   
      res.status(403).send(e);
    }
  });


module.exports = app;