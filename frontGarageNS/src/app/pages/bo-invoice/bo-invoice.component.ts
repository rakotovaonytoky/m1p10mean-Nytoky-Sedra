import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Facture } from 'src/app/classes/facture';

@Component({
  selector: 'app-bo-invoice',
  templateUrl: './bo-invoice.component.html',
  styleUrls: ['./bo-invoice.component.css']
})
export class BoInvoiceComponent implements OnInit {

  listFacture!: Facture[];
  dataSource!: MatTableDataSource<Facture>;
  filterForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: Router) {


  }

  ngOnInit(): void {
    this.getListeFacture();
    this.dataSource = new MatTableDataSource(this.listFacture);

    this.dataSource.filterPredicate = (data: Facture, filter: any) => {
      return data.car.model.toLocaleLowerCase().includes(filter) ||
        data.car.model.toLocaleLowerCase().includes(filter) ||
        data.car.licensePlate.toLocaleLowerCase().includes(filter);
    }
    this.filterForm = this.formBuilder.group({
      DateDebut: new FormControl(''),
      DateFin: new FormControl(''),
      matricule: new FormControl(''),
      etat: new FormControl('')
    });
  }
  displayedColumns: string[] = ['position', 'car', 'etat', 'date', '...'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListeFacture() {
    this.listFacture = [
      { id: 1, car: { vType: 1, vColor: "#000", brand: "WOlSWAGEN", model: "POLO 4", licensePlate: "7777 TBN", owner: "RABE", year: 2002 }, etat: 'payés', date: new Date() },
      { id: 2, car: { vType: 1, vColor: "#000", brand: "WOlSWAGEN", model: "POLO 4", licensePlate: "4444 TBN", owner: "RABE", year: 2002 }, etat: 'payés', date: new Date('2023/01/01') },
    ]
  }

  onFilterSubmit() {
    console.log();
    const matricule = this.filterForm.get('matricule')?.value;
    const type = this.filterForm.get('etat')?.value;
    const dateDebut = this.filterForm.get('DateDebut')?.value;
    const dateFin = this.filterForm.get('DateFin')?.value;
    var filter = this.buildFilter(matricule, type, dateDebut, dateFin);
    console.log("filter:", filter);
  }

  buildFilter(matricule: string, etat: string, dateDebut: string, dateFin: string): string {
    var filter = ""
    if (dateDebut === '' && dateFin === '' && matricule === "" && etat === "") {
      filter = "";
    } else {
      filter = "?";
      if (dateDebut !== '' && dateFin === '') {
        filter += this.checkStringLength(filter);
        filter += "dateDebut=" + dateDebut + "&dateFin=" + new Date().toString();
      }
      if (dateDebut !== '' && dateFin !== '') {
        filter += this.checkStringLength(filter);
        filter += "dateDebut=" + dateDebut + "&dateFin=" + dateFin;
      }
      if (matricule !== '') {
        filter += this.checkStringLength(filter);
        filter += "matricule=" + matricule;
      }
      if (etat !== '') {
        filter += this.checkStringLength(filter);
        filter += "etat=" + etat;
      }


    }
    return filter;
  }

  checkStringLength(char: string): string {
    if (char.endsWith("?")) {
      return '';
    } else {
      return "&";
    }
  }
  goInvoiceDetails(id: any) {
    this.route.navigate(
      ['/Bo/cars-invoice-details/', id],
    );
  }


}
