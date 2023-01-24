import { LoginService } from 'src/app/service/login/login.service';
import { Typevalue } from './../../classes/typevalue';
import { Car } from './../../classes/car';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { GlobalService } from 'src/app/service/globalService/global.service';
import { TypeObject } from 'src/app/classes-v2/type-object';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MatStepper } from '@angular/material/stepper';
import { CarV2 } from 'src/app/classes-v2/car-v2';
@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  @ViewChild('stepper') cdkStepper: MatStepper | undefined;

  user!: any;
  listCar!: any;
  constructor(private _formBuilder: FormBuilder,
    private snackBarService: SnackbarService,
    private globalService: GlobalService,
    private authService: AuthService) {

    this.user = this.authService.getUser();

    this.globalService.RefreshCar.subscribe(result => {
      this.getUserCar(this.user.id);
    })
  }


  typeCars$!: any;
  modelCars$!: any;
  car!: Car;

  firstFormGroup = this._formBuilder.group({
    vType: ['', Validators.required],
    vColor: ['#000'],
  });

  secondFormGroup = this._formBuilder.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
  });

  thridForm = this._formBuilder.group({
    licensePlate: ['', Validators.required],
    owner: ['', Validators.required],
    year: ['', Validators.required],
  });

  isLinear = true;


  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getCarType();
    this.getCarModel();
    this.getUserCar(this.user.id);

  }

  AddCar() {
    const carValue = {
      markCar: this.secondFormGroup.get('brand')?.value,
      typeCar: this.firstFormGroup.get('vType')?.value,
      colorCar: this.firstFormGroup.get('vColor')?.value,
      modelCar: this.secondFormGroup.get('model')?.value,
      matricule: this.thridForm.get('licensePlate')?.value,
      proprietaire: this.thridForm.get('owner')?.value,
      anneDeSortie: this.thridForm.get('year')?.value,
      idUser: this.user.id
    }
    // calling service
    console.log(carValue);

    this.globalService.addCar(carValue).subscribe({
      next: resp => {
        this.callSnackService();
        if (this.cdkStepper) {
          this.cdkStepper.reset()
        }
      },
      error: error => {

        this.callSnackServiceError();
      },
    })
    // this.callSnackService();

  }

  getCarType() {


    this.globalService.getTypeCar().subscribe({
      next: (carType: any) => {
        this.typeCars$ = Array.from(Object.values(carType))[0];
        console.log("", this.typeCars$);
      },
      error: (error: any) => {
        console.log("cartypeerror:", error);
      }
    });

  }
  getCarModel() {

    this.globalService.getMarkCar().subscribe({
      next: (carMark: TypeObject[]) => {
        this.modelCars$ = Array.from(Object.values(carMark))[0];
      }, error: (error: any) => {
        console.log("car mark", error);
      }
    })

  }

  callSnackService() {
    this.snackBarService.openSnackBar(
      'Voiture ajoutée',
      'Okey', 'center', 'top', ['green-snackbar', 'login-snackbar']);
  }

  callSnackServiceError() {
    this.snackBarService.openSnackBar(
      "Une erreur s'est produite",
      'Okey', 'center', 'top', ['red-snackbar']);
  }

  getUserCar(id: string) {
    this.globalService.getUsersCar(id).subscribe({
      next: data => {
        // this.listCar = Array.from(Object.values(data))[0];
        this.listCar = data;
        console.log("fetching car !", data);
      },
      error: (error: any) => {
        console.log("Error !", error);

      }
    })
  }



}
