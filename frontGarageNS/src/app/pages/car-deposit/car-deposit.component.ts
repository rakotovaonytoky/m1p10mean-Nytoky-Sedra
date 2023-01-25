import { TypeReparation } from './../../classes-v2/type-reparation';
import { Car } from './../../classes/car';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/service/globalService/global.service';
import { CarV2 } from 'src/app/classes-v2/car-v2';
import { AuthService } from 'src/app/service/auth/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';


const UNDEPOSIT_CAR = 0;
@Component({
  selector: 'app-car-deposit',
  templateUrl: './car-deposit.component.html',
  styleUrls: ['./car-deposit.component.css']
})
export class CarDepositComponent implements OnInit {

  user!: any;
  tableCar!: any;
  depositCar!: any;
  reparationList!: any;
  reparationSelected!: any;

  depositForm = this._formBuilder.group({
    date: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder,
    private globalService: GlobalService,
    private snackBarService: SnackbarService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getListReparation();
    this.depositCar = [];
    this.reparationSelected = [];
    this.getUnDepositCar(this.user.id);


  }

  getUnDepositCar(idUser: string) {

    this.globalService.getUsersCar(idUser).subscribe({
      next: data => {
        // this.listCar = Array.from(Object.values(data))[0];
        this.tableCar = data;
        this.tableCar = this.tableCar.filter((car: any) => {
          return car.etat === UNDEPOSIT_CAR
        });
        console.log("fetching car !", data);
      },
      error: (error: any) => {
        console.log("Error !", error);

      }
    })

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

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // alert("Previous container :" + event.previousContainer + " container:" + event.container);
      // alert(event.previousContainer.id);
      // alert(event.container.id);
      this.checkIfCarInDeposit(event);
    }
  }

  checkIfCarInDeposit(event: CdkDragDrop<any>) {

    if (event.previousContainer.id === "cdk-drop-list-0" && event.container.id === "cdk-drop-list-1") {
      if (this.depositCar.length < 1) {
        this.callSnackService("Voiture ajoutée.")
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      } else {
        this.callSnackServiceError("Une voiture est déjà en cours de déposition.");
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
        this.callSnackServiceError("Veuillez d'abord sélectionner une voiture.");
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
      this.callSnackServiceError("Veuillez d'abord sélectionner une voiture.");
      return;
    }
    if (this.depositForm.invalid) {
      return;
    }
  }
  callSnackService(message: string) {
    this.snackBarService.openSnackBar(
      message,
      'Okey', 'center', 'top', ['green-snackbar', 'login-snackbar']);
  }

  callSnackServiceError(error: string) {
    this.snackBarService.openSnackBar(
      error,
      'Okey', 'center', 'top', ['red-snackbar']);
  }

}

