import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, TypeProvider } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { CarV2 } from 'src/app/classes-v2/car-v2';
import { Depot } from 'src/app/classes-v2/depot';
import { TypeObject } from 'src/app/classes-v2/type-object';
import { TypeReparation } from 'src/app/classes-v2/type-reparation';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
const API_URL = environment.baseUrl;
let UNDEPOSIT_CAR = 0;
let WAIT_VALIDATION = 1;
let WAIT_REPARATION = 2;
let REPARATION_PROGRESS = 3;
let WAIT_CHECKOUT = 4;
let CHECKOUT_DONE = 5;
let RECOVER_CAR = 6;
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private _refreshCar = new Subject<void>();
  private _refreshDepot = new Subject<void>();

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public get RefreshCar() {
    return this._refreshCar;
  }
  public get RefreshDepot() {
    return this._refreshDepot;
  }
  public get UNDEPOSIT_CAR() {
    return UNDEPOSIT_CAR = 0;
  }

  public get WAIT_VALIDATION() {
    return WAIT_VALIDATION;
  }
  public get WAIT_REPARATION() {
    return WAIT_REPARATION;
  }
  public get WAIT_CHECKOUT() {
    return WAIT_CHECKOUT;
  }

  public get CHECKOUT_DONE() {
    return CHECKOUT_DONE;
  }

  public get RECOVER_CAR() {
    return RECOVER_CAR;
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
    );
  }

  getUsersCar(userId: string): Observable<CarV2[]> {
    return this.httpClient.get<CarV2[]>(API_URL + userId + '/cars');
  }

  addDepot(depot: any): Observable<any> {
    return this.httpClient.post(API_URL + "/carDepot", depot).pipe(
      tap(() => {
        this._refreshCar.next();
      }),
    );
  }

  getDepotById(id: string): Observable<Depot> {
    return this.httpClient.get<Depot>(API_URL + "depot/" + id);
  }

  getCarWaitValidation(): Observable<Depot[]> {
    return this.httpClient.get<Depot[]>(API_URL + 'carInDepot');
  }
  getCarWaitReparation(): Observable<Depot[]> {
    return this.httpClient.get<Depot[]>(API_URL + 'carWaitReparation');
  }

  getCarReparationProgress(): Observable<Depot[]> {
    return this.httpClient.get<Depot[]>(API_URL + 'carReparationProgress');
  }

  getCarReparationDone(): Observable<Depot[]> {
    return this.httpClient.get<Depot[]>(API_URL + 'carReparationDone');
  }

  getCarCheckoutDone(): Observable<Depot[]> {
    return this.httpClient.get<Depot[]>(API_URL + 'carReparationCheckoutDone');
  }

  getUsersCarUnDepot(userId: string): Observable<Depot[]> {
    return this.httpClient.get<Depot[]>(API_URL + userId + '/CarUnDepot');
  }

  getUsersCarWaitValidation(userId: string): Observable<Depot[]> {
    return this.httpClient.get<Depot[]>(API_URL + userId + '/carWaitValidation');
  }
  getUsersCarReparationProgress(userId: string): Observable<Depot[]> {
    return this.httpClient.get<Depot[]>(API_URL + userId + '/carReparationProgress');
  }
  getUsersCarReparationDone(userId: string): Observable<Depot[]> {
    return this.httpClient.get<Depot[]>(API_URL + userId + '/carReparationDone');
  }

  validateDepot(id: string): Observable<any> {
    return this.httpClient.post(API_URL + "validateDepot/" + id, {}).pipe(
      tap(() => {
        this._refreshDepot.next();
      })
    );
  }

  DepotTorepair(id: string): Observable<any> {
    return this.httpClient.post(API_URL + "reparer/" + id, {}).pipe(
      tap(() => {
        this._refreshDepot.next();
      })
    );
  }

  DepotToDoneRepair(id: string): Observable<any> {
    return this.httpClient.post(API_URL + "terminer/" + id, {}).pipe(
      tap(() => {
        this._refreshDepot.next();
      })
    );
  }
  DepotToFacturer(id: string): Observable<any> {
    return this.httpClient.post(API_URL + "facturer/" + id, {}).pipe(
      tap(() => {
        this._refreshDepot.next();
      })
    );
  }
  DepotFinir(id: string): Observable<any> {
    return this.httpClient.post(API_URL + "finir/" + id, {}).pipe(
      tap(() => {
        this._refreshDepot.next();
      })
    );
  }

}
