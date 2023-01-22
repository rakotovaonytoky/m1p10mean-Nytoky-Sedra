import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-bo-header',
  templateUrl: './bo-header.component.html',
  styleUrls: ['./bo-header.component.css']
})
export class BoHeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  username!: string;
  ngOnInit(): void {
    this.getuserName();
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(
      ['/login'],
    );

  }
  getuserName() {
    const user = this.authService.getUser();
    this.username = user.name;
  }

}
