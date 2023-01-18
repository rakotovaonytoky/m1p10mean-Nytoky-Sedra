import { TypeReparation } from './../../classes/type-reparation';
import { Car } from './../../classes/car';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-car-deposit',
  templateUrl: './car-deposit.component.html',
  styleUrls: ['./car-deposit.component.css']
})
export class CarDepositComponent implements OnInit {

  tableCar!: Car[];
  depositCar!: Car[];
  reparationList!: TypeReparation[];
  reparationSelected!: TypeReparation[];
  constructor() { }

  ngOnInit(): void {
    this.getUnDepositCar();
    this.depositCar = [];
    this.getListReparation();
  }

  getUnDepositCar() {
    this.tableCar = [
      {
        vType: 1, vColor: "orange", brand: "1", model: "POLO 4", licensePlate: "4444 TBN", owner: "Rakoto", year: 2000
      },
      {
        vType: 2, vColor: "red", brand: "1", model: "POLO 4", licensePlate: "4444 TBN", owner: "Rakoto", year: 2000
      }
    ]
  }
  getListReparation() {
    this.reparationList = [
      { idType: 1, value: "Diagnositque", img: "1.png" },
      { idType: 2, value: "Verification frein", img: "2.png" },
      { idType: 3, value: "Vidange", img: "3.png" },
      { idType: 4, value: "Polissage  pneus", img: "4.png" },
      { idType: 5, value: "Suspension et direction", img: "5.png" }
    ]
  }

  drop(event: CdkDragDrop<Car[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.checkIfCarInDeposit(event);
    }
  }

  checkIfCarInDeposit(event: CdkDragDrop<Car[]>) {
    if (this.depositCar.length < 1) {
      alert("manisy voalohany" + this.depositCar.length);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );


    } else {
      alert("efa misy automobile");
    }
  }

}
