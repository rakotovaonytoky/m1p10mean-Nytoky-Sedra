import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
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

  isLinear = false;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
