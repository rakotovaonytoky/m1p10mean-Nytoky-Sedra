const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// function isEmail(email) { 
//     var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');
//     return regEmail.test(email);
// }

//midefinir type de données ao @N'ILAY user
const userSchema = mongoose.Schema(
         {
             name:{
                 type:String,
                 required: true
            },
             email:{
                type:String,
                required:true,
                 unique : true,
                validate(v){
                    if(!validator.isEmail(v)) throw new Error('Email invalide !');
                
                }// michek hoe valide ve format ilay email
            },
             password:{
                 type:String,
                 required:true
            },
             confirmPassword:{
                 type:String,
                 required:true
            },

         }
);

//micheck hoe mi-existe ve ilay mail, ary true ve ilay mdp
userSchema.statics.checkUser = async(userData, password) =>{
    if(!userData) {
        console.log('[INFO] **************Email invalide**********');
        throw new Error ('Erreur de login: Email non reconnue');
    }
    console.log('[INFO] email :'+userData.email);
    //micompare le mdp @n'ilay mdp crypté   anaty base
    const isPasswordValid = await bcrypt.compare(password,userData.password);
         if (!isPasswordValid){
            console.log('[INFO] **************password invalide**********');
            res.status(403).json({ message :'Erreur de login: mot de passe eronnée'});
            throw new Error ('Erreur de login: mot de passe eronnée');s
        }
            
           
         console.log('[INFO] valid password,connexion....');
         
    return userData;//mireturn datauser rehefa vrai daholo
}


userSchema.pre('save', async function(){
    console.log('[INFO] CRYPTAGE MotDePasse');
    if(this.isModified('password')) this.password = await bcrypt.hash(this.password,8);
    if(this.isModified('confirmPassword')) this.confirmPassword = await bcrypt.hash(this.confirmPassword,8);
    console.log('[INFO] cryptage réussi');
    return 0;
});


module.exports= mongoose.model('User',userSchema);