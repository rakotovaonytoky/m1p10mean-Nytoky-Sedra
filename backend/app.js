const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
const cors = require('cors');
const Car = require('./models/car');
const TypeReparation = require('./models/typeReparation');
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

//------- TSY MANDEHA-------------
//ialana @n'ilay error anah // 
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });
app.use(cors());


//api inscription, insertion anah nouvelle utilisateur
  app.post('/api/inscription',(req,res,next)=>{
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
          res.status(201).json(user.email)
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

//maka data an'ny users rehetraaa
  app.get('/api/users', (req, res, next) => {
    User.find()
    .then(users => {
        console.log('[INFO] affichage reussi');
        res.status(200).json(users)})
    .catch(error =>{
        console.log('[INFO] erreur d affichage');
         res.status(400).json(error)});
    });

  

   
   //api login , migerer hoe valide ve ilay mail, ensuite hoe true ve mdp, mireturn données users izyy 
  app.post('/api/login', async (req,res,next) =>{
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

  
const addCar= (req,res ) =>{
  console.log({...req.body}); 
  delete req.body._id;  
  const car =new Car( {
    ...req.body
   });
   car.save()
      .then(() =>{
        console.log('[INFO] voiture Enregistré');
        res.status(201).json(car.matricule)
      })
    .catch((error) => {
      // catch uniquekey for Mail
        errMsg = error.message;
        res.status(400).json(error);
      }); 
    }
app.post('/api/car',(req,res,next)=>{addCar(req,res)});


const addTypeReparation= (req,res ) =>{
  console.log({...req.body}); 
  delete req.body._id;  
  const typeReparation =new TypeReparation( {
    ...req.body
   });
   typeReparation.save()
      .then(() =>{
        console.log('[INFO] voiture Enregistré');
        res.status(201).json(typeReparation)
      })
    .catch((error) => {
      // catch uniquekey for Mail
        errMsg = error.message;
        res.status(400).json(error);
      }); 
    }
app.post('/api/suggestRepairs',(req,res,next)=>{addTypeReparation(req,res)});

app.get('/api/suggestRepairs', (req, res, next) => {
  TypeReparation.find()
.then(typeReparations => {
    console.log('[INFO] affichage reussi');
    res.status(200).json(typeReparations)})
.catch(error =>{
    console.log('[INFO] erreur d affichage');
     res.status(400).json(error)});
});

module.exports = app;