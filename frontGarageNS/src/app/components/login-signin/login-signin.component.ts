import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/classes/custom-validator';

@Component({
  selector: 'app-login-signin',
  templateUrl: './login-signin.component.html',
  styleUrls: ['./login-signin.component.css']
})
export class LoginSigninComponent implements OnInit {

  constructor(private elRef: ElementRef) { }
  sign_in_btn: any;
  cont: any;
  button = 'Se connecter';
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

  }
  login() {
    this.isLoginLoading = true;
    this.button = 'Chargement';

    setTimeout(() => {
      this.isLoginLoading = false;
      this.button = 'Se connecter';
      alert('Done loading');
    }, 8000)
  }


}
