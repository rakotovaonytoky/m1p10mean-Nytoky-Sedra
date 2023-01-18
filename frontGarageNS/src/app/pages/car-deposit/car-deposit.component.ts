import { TypeReparation } from './../../classes/type-reparation';
import { Car } from './../../classes/car';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, Validators } from '@angular/forms';
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

  depositForm = this._formBuilder.group({
    date: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUnDepositCar();
    this.getListReparation();
    this.depositCar = [];
    this.reparationSelected = [];
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
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (this.depositCar.length < 1) {
        alert("mbola tsisy daba");
        return;
      }
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
  depositSubmitting() {
    if (this.depositCar.length < 1) {
      alert("mbola tsisy daba");
      return;
    }
    if (this.depositForm.invalid) {
      return;
    }
  }

}

