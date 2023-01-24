import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, TypeProvider } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeObject } from 'src/app/classes-v2/type-object';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
const API_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getTypeCar(): Observable<TypeObject[]> {
    let token = this.authService.getToken();
    return this.httpClient.get<TypeObject[]>(API_URL + 'typecar');
  }

  getMarkCar(): Observable<TypeObject[]> {
    return this.httpClient.get<TypeObject[]>(API_URL + 'markcar');
  }

  // getSuggestRepair() {
  //   return this.httpClient.get()
  // }
}
