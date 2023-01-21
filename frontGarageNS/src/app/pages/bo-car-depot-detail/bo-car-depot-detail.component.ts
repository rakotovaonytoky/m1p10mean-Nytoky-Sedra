import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: 'app-bo-car-depot-detail',
  templateUrl: './bo-car-depot-detail.component.html',
  styleUrls: ['./bo-car-depot-detail.component.css']
})
export class BoCarDepotDetailComponent implements OnInit {

  id: any;
  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Beach ball', cost: 4000 },
    { item: 'Towel', cost: 5 },
    { item: 'Frisbee', cost: 2 },

  ];
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // alert(this.id);
  }

  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  validateDepot() {
    alert("Validation depôt");
  }
  backToDepot() {
    this.router.navigate(
      ['/Bo/depot/'],
    );
  }
}
