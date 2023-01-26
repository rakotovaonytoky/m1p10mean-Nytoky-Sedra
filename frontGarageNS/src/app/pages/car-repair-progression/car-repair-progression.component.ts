import { Component, OnInit } from '@angular/core';
import { Depot } from 'src/app/classes-v2/depot';
import { AuthService } from 'src/app/service/auth/auth.service';
import { GlobalService } from 'src/app/service/globalService/global.service';

@Component({
  selector: 'app-car-repair-progression',
  templateUrl: './car-repair-progression.component.html',
  styleUrls: ['./car-repair-progression.component.css']
})
export class CarRepairProgressionComponent implements OnInit {

  CarWaitValidation!: Depot[];
  CarReparationProgress!: Depot[];
  CarReparationDone!: Depot[];
  user!: any;
  constructor(private globalService: GlobalService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user) {

      this.getCarWaitValidation(this.user.id);
      this.getCarReparationProgress(this.user.id);
      this.getCarReparationDone(this.user.id);
    }
  }

  getCarWaitValidation(id: string) {
    this.globalService.getUsersCarWaitValidation(id).subscribe({
      next: (value: Depot[]) => {
        this.CarWaitValidation = value;
        console.log("reparation wait", this.CarWaitValidation);
      },
      error: (error: any) => {
        console.log("Error from Car Wait Validation", error);
      }
    });
  }
  getCarReparationProgress(id: string) {
    this.globalService.getUsersCarReparationProgress(id).subscribe({
      next: (value: Depot[]) => {
        this.CarReparationProgress = value;
        console.log("reparation progress", this.CarReparationProgress);

      },
      error: (error: any) => {
        console.log("Error from Car reparation progress", error);
      }
    });
  }
  getCarReparationDone(id: string) {
    this.globalService.getUsersCarReparationDone(id).subscribe({
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
