import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: '444 TBN', weight: "Rabe", symbol: '2022-10-02' },
  { position: 2, name: '444 TBN', weight: "Rabe", symbol: '2022-10-02' },
  { position: 3, name: '444 TBN', weight: "Rabe", symbol: '2022-10-02' },
  { position: 4, name: '444 TBN', weight: "Rabe", symbol: '2022-10-02' },
];
@Component({
  selector: 'app-bo-depot',
  templateUrl: './bo-depot.component.html',
  styleUrls: ['./bo-depot.component.css']
})
export class BoDepotComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private route: Router) { }
  filterForm!: FormGroup;
  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      DateDebut: new FormControl(''),
      DateFin: new FormControl(''),
      matricule: new FormControl(''),
      proprietaire: new FormControl('')
    });
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', '...'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onFilterSubmit() {
    console.log();
    const matricule = this.filterForm.get('matricule')?.value;
    const type = this.filterForm.get('proprietaire')?.value;
    const dateDebut = this.filterForm.get('DateDebut')?.value;
    const dateFin = this.filterForm.get('DateFin')?.value;
    var filter = this.buildFilter(matricule, type, dateDebut, dateFin);
    console.log("filter:", filter);
  }

  buildFilter(matricule: string, proprietaire: string, dateDebut: string, dateFin: string): string {
    var filter = ""
    if (dateDebut === '' && dateFin === '' && matricule === "" && proprietaire === "") {
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
      if (proprietaire !== '') {
        filter += this.checkStringLength(filter);
        filter += "proprietaire=" + proprietaire;
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
  goDepotDetails(id: any) {
    this.route.navigate(
      ['/Bo/depot-details/', id],
    );
  }
}
