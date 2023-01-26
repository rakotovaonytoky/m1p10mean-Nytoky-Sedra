import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Depot } from 'src/app/classes-v2/depot';
import { GlobalService } from 'src/app/service/globalService/global.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-bo-car-progression',
  templateUrl: './bo-car-progression.component.html',
  styleUrls: ['./bo-car-progression.component.css']
})
export class BoCarProgressionComponent implements AfterViewInit {

  constructor(private globalService: GlobalService,
    private snackBarService: SnackbarService) {

    this.globalService.RefreshDepot.subscribe(data => {
      this.getCarWaitReparation();
      this.getCarReparationProgress();
      this.getCarReparationDone();
    });

  }
  @ViewChild('EnReparation', { static: false }) EnReparation!: CdkDropList<any>;
  @ViewChild('reparationList', { static: false }) reparationList!: CdkDropList<any>;
  @ViewChild('reparationDone', { static: false }) reparationDone!: CdkDropList<any>;
  CarWaitValidation!: Depot[];
  CarReparationProgress!: Depot[];
  CarReparationDone!: Depot[];

  ngAfterViewInit(): void {
    this.getCarWaitReparation();
    this.getCarReparationProgress();
    this.getCarReparationDone();
  }
  getCarWaitReparation() {
    this.globalService.
      getCarWaitReparation()
      .subscribe({
        next: (value: Depot[]) => {
          this.CarWaitValidation = value;
          console.log("reparation wait", this.CarWaitValidation);
        },
        error: (error: any) => {
          console.log("Error from Car Wait Validation", error);
        }
      });
  }
  getCarReparationProgress() {
    this.globalService.
      getCarReparationProgress()
      // getCarWaitValidation()
      .subscribe({
        next: (value: Depot[]) => {
          this.CarReparationProgress = value;
          console.log("reparation progress", this.CarReparationProgress);

        },
        error: (error: any) => {
          console.log("Error from Car reparation progress", error);
        }
      });
  }
  getCarReparationDone() {
    this.globalService.getCarReparationDone().subscribe({
      next: (value: Depot[]) => {
        this.CarReparationDone = value;
        console.log("reparation done", this.CarReparationDone);

      },
      error: (error: any) => {
        console.log("Error from Car reparation done", error);
      }
    });
  }

  drop(event: CdkDragDrop<Depot[]>, id: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex,
      // );
      if (id == 1) {
        return;
      }
      this.WaitReparationToReparation(event, id);
      this.ReparationToDone(event, id);
    }
  }

  WaitReparationToReparation(event: CdkDragDrop<Depot[]>, id: any) {
    if (id == 2) {
      // console.log(event.previousContainer.data[event.previousIndex]);
      console.log(event.item.data);
      const id = event.item.data._id;

      this.globalService.DepotTorepair(id).subscribe({
        next: () => {
          this.callSnackService('La réparation a commencé');
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );
        },
        error: (error: any) => {
          this.callSnackService("Une erreur s'est produite!");
        }, complete: () => {
          return;
        }
      })
    }

  }
  ReparationToDone(event: CdkDragDrop<Depot[]>, id: any) {
    if (id == 3) {
      const id = event.item.data._id;

      this.globalService.DepotToDoneRepair(id).subscribe({
        next: () => {
          this.callSnackService('La réparation est terminée');
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );
        },
        error: (error: any) => {
          this.callSnackService("Une erreur s'est produite!");
        }, complete: () => {
          return;
        }
      })
    }
  }
  callSnackService(message: string) {
    this.snackBarService.openSnackBar(
      message,
      'Okey', 'center', 'top', ['green-snackbar', 'login-snackbar']);
  }

  callSnackServiceError(message: string) {
    this.snackBarService.openSnackBar(
      message,
      'Okey', 'center', 'top', ['red-snackbar']);
  }

  DepotToRepair(id: string) {
    this.globalService.DepotTorepair(id).subscribe({
      next: () => { this.callSnackService('La réparation a commencé'); },
      error: (error: any) => { this.callSnackService("Une erreur s'est produite!"); }
    })
  }

  DepotToDoneRepair(id: string) {
    this.globalService.DepotToDoneRepair(id).subscribe({
      next: () => { this.callSnackService('La réparation est terminée'); },
      error: (error: any) => { this.callSnackService("Une erreur s'est produite!"); }
    })
  }



}
