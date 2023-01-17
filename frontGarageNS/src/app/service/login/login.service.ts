import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const API_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpclient: HttpClient) { }


  loginUser(emaill: any, passwordd: any): Observable<any> {
    const user = {
      email: emaill,
      password: passwordd
    }
    return this.httpclient.post(API_URL + "login", user);
  }
}
