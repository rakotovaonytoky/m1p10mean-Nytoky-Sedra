import { Typevalue } from './../../classes/typevalue';
import { Car } from './../../classes/car';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { SnackbarService } from 'src/app/service/snackbar.service';
@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {


  constructor(private _formBuilder: FormBuilder,
    private snackBarService: SnackbarService) { }

  ToInsert!: Car;
  typeCars$!: Observable<Typevalue[]>;
  modelCars$!: Observable<Typevalue[]>;

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
    this.typeCars$ = of([
      { idType: 1, value: "Légère" },
      { idType: 2, value: "4x4" },
      { idType: 3, value: "SUV" },
      { idType: 4, value: "Camionette" },
      { idType: 5, value: "Camion" },
    ])

  }
  getCarModel() {
    this.modelCars$ = of([
      { idType: 1, value: "TOYOTA" },
      { idType: 2, value: "MAZDA" },
      { idType: 2, value: "WOLKSWAGEN" },
    ])
  }

  callSnackService() {
    this.snackBarService.openSnackBar(
      'Voiture ajoutée',
      'Okey', 'center', 'top', ['green-snackbar', 'login-snackbar']);
  }



}
