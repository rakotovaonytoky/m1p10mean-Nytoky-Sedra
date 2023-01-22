import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
