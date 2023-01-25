import { TypeReparation } from './../../classes-v2/type-reparation';
import { Car } from './../../classes/car';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/service/globalService/global.service';
@Component({
  selector: 'app-car-deposit',
  templateUrl: './car-deposit.component.html',
  styleUrls: ['./car-deposit.component.css']
})
export class CarDepositComponent implements OnInit {

  tableCar!: Car[];
  depositCar!: Car[];
  reparationList!: any;
  reparationSelected!: any;

  depositForm = this._formBuilder.group({
    date: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder,
    private globalService: GlobalService) { }

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

    this.globalService.getSuggestRepair().subscribe({
      next: (data: any) => {
        this.reparationList = Array.from(Object.values(data))[0];
        // console.log("reparation list", this.reparationList);
      },
      error: (err) => { }
    })
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
      console.log("selected Reparation", this.reparationSelected);
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

