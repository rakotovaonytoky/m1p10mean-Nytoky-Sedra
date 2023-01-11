import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-signin',
  templateUrl: './login-signin.component.html',
  styleUrls: ['./login-signin.component.css']
})
export class LoginSigninComponent implements OnInit {

  constructor(private elRef: ElementRef) { }
  sign_in_btn: any;
  cont: any;
  container: any;
  ngOnInit(): void {
    this.sign_in_btn = this.elRef.nativeElement.querySelector(".img__btn");
    this.cont = this.elRef.nativeElement.querySelector(".cont");
    // this.sign_up_btn.addEventListener("click", () => {
    //   console.log("click");
    // });
    // this.sign_in_btn.addEventListener("click", () => {
    //   this.container?.classList.remove("sign-up-mode");
    // });
  }

  sigupClick() {
    this.cont?.classList.toggle('s--signup');
  }


}
