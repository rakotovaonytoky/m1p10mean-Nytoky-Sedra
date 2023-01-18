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

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  constructor() { }

  ngOnInit(): void {
    this.getUnDepositCar();
    this.getListReparation();
    this.depositCar = [];
    this.reparationSelected = [{ idType: 1, value: "Diagnositque", img: "1.png" }];
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
      // alert("Previous container :" + event.previousContainer + " container:" + event.container);
      // alert(event.previousContainer.id);
      // alert(event.container.id);
      this.checkIfCarInDeposit(event);
    }
  }

  checkIfCarInDeposit(event: CdkDragDrop<Car[]>) {

    if (event.previousContainer.id === "cdk-drop-list-0" && event.container.id === "cdk-drop-list-1") {
      if (this.depositCar.length < 1) {
        alert("manisy voalohany" + this.depositCar.length);

        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      } else {
        alert("efa misy automobile ao");
      }

    }

    // else {
    //   alert("efa misy automobile");
    // }
  }

  dropReparation(event: CdkDragDrop<TypeReparation[]>) {
    alert(" event.previousIndex :" + event.previousIndex + " event.currentIndex," + event.currentIndex);
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

  resetDeposit() {
    if (this.depositCar.length == 1) {
      window.location.reload();
    }
  }
  drop1(event: CdkDragDrop<any[]>) {
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
