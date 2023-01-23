import { LoginService } from 'src/app/service/login/login.service';
import { Typevalue } from './../../classes/typevalue';
import { Car } from './../../classes/car';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { GlobalService } from 'src/app/service/globalService/global.service';
import { TypeObject } from 'src/app/classes-v2/type-object';
@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {


  constructor(private _formBuilder: FormBuilder,
    private snackBarService: SnackbarService,
    private globalService: GlobalService) { }

  ToInsert!: Car;
  typeCars$!: any;
  modelCars$!: any;
  car!: Car;

  firstFormGroup = this._formBuilder.group({
    vType: ['', Validators.required],
    vColor: [''],
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
    this.getCarType();
    this.getCarModel();
    // this.car.brand = "mercedes";
    // this.car.licensePlate = "4444 TBN";

  }

  AddCar() {
    const carValue = {
      vType: this.firstFormGroup.get('vType')?.value,
      vColor: this.firstFormGroup.get('vColor')?.value,
      brand: this.secondFormGroup.get('brand')?.value,
      model: this.secondFormGroup.get('model')?.value,
      licensePlate: this.thridForm.get('licensePlate')?.value,
      owner: this.thridForm.get('owner')?.value,
      year: this.thridForm.get('year')?.value,
    }
    // calling service
    this.ToInsert = new Car(carValue);
    this.callSnackService();

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
      'Voiture ajoutée',
      'Okey', 'center', 'top', ['red-snackbar']);
  }



}
