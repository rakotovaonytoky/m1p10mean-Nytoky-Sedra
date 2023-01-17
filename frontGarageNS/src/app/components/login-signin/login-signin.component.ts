import { RegisterDto } from './../../classes/register-dto';
import { LoginService } from 'src/app/service/login/login.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/classes/custom-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signin',
  templateUrl: './login-signin.component.html',
  styleUrls: ['./login-signin.component.css']
})
export class LoginSigninComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private route: Router,
    public elRef: ElementRef) {

  }
  sign_in_btn: any;
  cont: any;
  button = 'Se connecter';
  buttonRegister = 'Créer';
  submittedLogin = false;
  isLoginLoading = false;
  loginErrorMessage!: any;

  submiteRegister = false;
  isRegisterLoading = false;
  submittedRegister = false;
  registerErrorMessage!: any;
  registerSuccessMessage!: any;

  userRegister = new FormGroup({
    nom: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    motDePasse: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmer: new FormControl('', [Validators.required])
  },
    CustomValidators.mustMatch('motDePasse', 'confirmer')
  );


  userLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    motDePasse: new FormControl('', [Validators.required]),
  }
  );


  ngOnInit(): void {
    this.sign_in_btn = this.elRef.nativeElement.querySelector(".img__btn");
    this.cont = this.elRef.nativeElement.querySelector(".cont");

  }

  sigupClickSwitch() {
    this.cont?.classList.toggle('s--signup');
  }

  register() {

    this.registerLoader(true, 'Chargement');

    if (this.userRegister.invalid) {
      this.registerLoader(false, 'Créer');
      return;
    }
    const user = new RegisterDto({
      name: this.userRegister.get('nom')?.value,
      email: this.userRegister.get('email')?.value,
      password: this.userRegister.get('motDePasse')?.value,
      confirmPassword: this.userRegister.get('confirmer')?.value,
    });

    // this.loginService.register

    this.loginService.register(user).subscribe({
      next: (user: any) => {
        this.registerSuccessMessage = "Compte créé avec succès";
        this.registerLoader(false, 'Créer');
        alert("success");
      }, error: (error: any) => {
        console.log(error);

        if (error.status == 0) {
          alert(error.message);
          this.registerErrorMessage = 'Erreur interne du serveur ';
        } else {
          this.registerErrorMessage = "Une erreur s'est produite";
        }
        this.loginLoader(false, 'Se connecter');
        this.registerLoader(false, 'Créer');

        console.log("ERREUR!!");
      }, complete: () => {
        this.registerLoader(false, 'Créer');
      }
    })
  }

  login() {
    this.loginLoader(true, 'Chargement');

    if (this.userLogin.invalid) {
      this.loginLoader(false, 'Se connecter');
      return;
    }
    this.loginService.loginUser(this.userLogin.get('email')?.value, this.userLogin.get('motDePasse')?.value).subscribe({
      next: (user: any) => {

        this.route.navigate(['/template/home']);
      }, error: (error: any) => {
        console.log(error);

        if (error.status == 0) {
          alert(error.message);
          this.loginErrorMessage = 'Erreur interne du serveur ';
        } else {
          this.loginErrorMessage = error.message.text;
        }
        this.loginLoader(false, 'Se connecter');

        console.log("ERREUR!!");
      }
    })
  }

  get r() {
    return this.userRegister.controls;
  }
  get l() {
    return this.userLogin.controls;
  }

  loginLoader(isloading: boolean, text: string) {
    this.isLoginLoading = isloading;
    this.button = text;
    this.submittedLogin = isloading;
  }

  registerLoader(isloading: boolean, text: string) {
    this.isRegisterLoading = isloading;
    this.buttonRegister = text;
    this.submittedRegister = isloading;
  }


}
