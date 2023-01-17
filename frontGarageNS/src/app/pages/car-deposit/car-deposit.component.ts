import { Car } from './../../classes/car';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-deposit',
  templateUrl: './car-deposit.component.html',
  styleUrls: ['./car-deposit.component.css']
})
export class CarDepositComponent implements OnInit {

  tableCar!: Car[];
  constructor() { }

  ngOnInit(): void {
  }

  getUnDepositCar() {
    //   this.tableCar = [
    //     { }
    //   ]
  }

}
