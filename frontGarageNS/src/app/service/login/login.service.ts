import { RegisterDto } from './../../classes/register-dto';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const API_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpclient!: HttpClient
  constructor(private handler: HttpBackend) {
    this.httpclient = new HttpClient(handler);
  }


  loginUser(emaill: any, passwordd: any): Observable<any> {
    const user = {
      email: emaill,
      password: passwordd
    }
    return this.httpclient.post(API_URL + "login", user);
  }

  register(user: RegisterDto): Observable<any> {
    return this.httpclient.post<any>(API_URL + "inscription", user);
  }
}
