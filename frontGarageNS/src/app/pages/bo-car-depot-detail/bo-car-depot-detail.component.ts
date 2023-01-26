import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Depot } from 'src/app/classes-v2/depot';
import { TypeReparation } from 'src/app/classes-v2/type-reparation';
import { GlobalService } from 'src/app/service/globalService/global.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-bo-car-depot-detail',
  templateUrl: './bo-car-depot-detail.component.html',
  styleUrls: ['./bo-car-depot-detail.component.css']
})
export class BoCarDepotDetailComponent implements OnInit {

  id: any;
  depot!: Depot;
  listSuggestion!: any;
  etatDepot!: any;
  deposerEtat!: any;
  reparationFini!: any;
  dataSource!: MatTableDataSource<TypeReparation>;
  displayedColumns: string[] = ['Position', 'Suggestion'];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService,
    private snackBarService: SnackbarService) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.globalService.RefreshDepot.subscribe(data => {
      this.getDepotByid(this.id);
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDepotByid(this.id);
    this.etatDepot = this.globalService.WAIT_VALIDATION;
    this.deposerEtat = this.globalService.WAIT_REPARATION;
    this.reparationFini = this.globalService.WAIT_CHECKOUT;
  }

  getTotalCost() {
    // return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  validateDepot() {
    this.globalService.validateDepot(this.id).subscribe({
      next: () => {
        this.callSnackService('Depot validé');
      },
      error: (error: any) => {

        this.callSnackService("Une erreur s'est produite!");
      }
    })
  }
  backToDepot() {
    this.router.navigate(
      ['/Bo/depot/'],
    );
  }

  getDepotByid(id: string) {
    this.globalService.getDepotById(id).subscribe({
      next: (result: any) => {
        this.depot = result;
        console.log("depot", this.depot);
        this.listSuggestion = this.depot.idtypeReparation;
        this.dataSource = new MatTableDataSource<TypeReparation>(this.listSuggestion);
        console.log("", this.listSuggestion);
      },
      error: (error: any) => {
        console.log(error);
        alert("invalid id");
        setTimeout(() => {
          this.router.navigate(
            ['/Bo/depot'],
          );
        }, 2000);

      }
    })
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





}
