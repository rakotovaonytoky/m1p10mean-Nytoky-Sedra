import { Component, OnInit } from '@angular/core';
interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: 'app-bo-invoice-details',
  templateUrl: './bo-invoice-details.component.html',
  styleUrls: ['./bo-invoice-details.component.css']
})
export class BoInvoiceDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  id: any;
  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Beach ball', cost: 4000 },
    { item: 'Towel', cost: 5 },
    { item: 'Frisbee', cost: 2 },

  ];

  validateDepot() {
    alert("Validation depôt");
  }
}

