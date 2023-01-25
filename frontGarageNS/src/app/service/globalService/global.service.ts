import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, TypeProvider } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { CarV2 } from 'src/app/classes-v2/car-v2';
import { TypeObject } from 'src/app/classes-v2/type-object';
import { TypeReparation } from 'src/app/classes-v2/type-reparation';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
const API_URL = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private _refreshCar = new Subject<void>();

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public get RefreshCar() {
    return this._refreshCar;
  }

  getTypeCar(): Observable<TypeObject[]> {
    let token = this.authService.getToken();
    return this.httpClient.get<TypeObject[]>(API_URL + 'typecar');
  }

  getMarkCar(): Observable<TypeObject[]> {
    return this.httpClient.get<TypeObject[]>(API_URL + 'markcar');
  }

  getSuggestRepair(): Observable<TypeReparation[]> {
    return this.httpClient.get<TypeReparation[]>(API_URL + 'suggestRepairs');
  }

  addCar(car: any): Observable<any> {
    return this.httpClient.post<any>(API_URL + "car", car).pipe(
      tap(() => {
        this._refreshCar.next();
      }),
    );;
  }

  getUsersCar(userId: string): Observable<CarV2[]> {
    return this.httpClient.get<CarV2[]>(API_URL + userId + '/cars');
  }

}
