import { LoginService } from './../../service/login/login.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/classes/custom-validator';

@Component({
  selector: 'app-login-signin',
  templateUrl: './login-signin.component.html',
  styleUrls: ['./login-signin.component.css']
})
export class LoginSigninComponent implements OnInit {

  constructor(
    loginService: LoginService,
    public elRef: ElementRef) {

  }
  sign_in_btn: any;
  cont: any;
  button = 'Se connecter';
  buttonRegister = 'Créer';
  submittedLogin = false;
  isLoginLoading = false;
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
    this.isLoginLoading = true;
    this.buttonRegister = 'Chargement';

    setTimeout(() => {
      this.isLoginLoading = false;
      this.buttonRegister = 'Créer';
      alert('Done loading');
    }, 8000)
  }
  login() {
    this.isLoginLoading = true;
    this.button = 'Chargement';
    this.submittedLogin = true;

    if (this.userLogin.invalid) {
      this.isLoginLoading = false;
      this.button = 'Se connecter';
      this.submittedLogin = false;
      return;
    }

    setTimeout(() => {
      this.isLoginLoading = false;
      this.button = 'Se connecter';
      alert('Done loading');
    }, 2000)

    // this.loginservice.loginUser(this.userLogin.get('email'), this.userLogin.get('motDePasse'))
    //   .subscribe({
    //   next: (data: any) => {

    //   }, error: (err: any) => {

    //   }, complete: () => {

    //   }
    // })
  }

  get r() {
    return this.userRegister.controls;
  }
  get l() {
    return this.userLogin.controls;
  }


}
