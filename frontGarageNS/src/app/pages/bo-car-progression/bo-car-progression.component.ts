import { Component, OnInit } from '@angular/core';
import { Depot } from 'src/app/classes-v2/depot';
import { GlobalService } from 'src/app/service/globalService/global.service';

@Component({
  selector: 'app-bo-car-progression',
  templateUrl: './bo-car-progression.component.html',
  styleUrls: ['./bo-car-progression.component.css']
})
export class BoCarProgressionComponent implements OnInit {

  constructor(private globalService: GlobalService) { }

  CarWaitValidation!: Depot[];
  CarReparationProgress!: Depot[];
  CarReparationDone!: Depot[];
  ngOnInit(): void {
  }
  getCarWaitValidation() {
    this.globalService.getCarWaitValidation().subscribe({
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
    this.globalService.getCarReparationProgress().subscribe({
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

}
