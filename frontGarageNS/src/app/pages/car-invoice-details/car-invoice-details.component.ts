import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: 'app-car-invoice-details',
  templateUrl: './car-invoice-details.component.html',
  styleUrls: ['./car-invoice-details.component.css']
})
export class CarInvoiceDetailsComponent implements OnInit {
  id: any;
  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Beach ball', cost: 4000 },
    { item: 'Towel', cost: 5 },
    { item: 'Frisbee', cost: 2 },

  ];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    alert(this.id);
  }

  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  checkout() {
    alert("Payer dans les agences");
  }

}
