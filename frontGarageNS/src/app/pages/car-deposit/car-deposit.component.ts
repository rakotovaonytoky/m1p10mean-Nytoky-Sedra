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
  constructor() { }

  ngOnInit(): void {
    this.getUnDepositCar();
    this.depositCar = [];
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
  drop(event: CdkDragDrop<Car[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
