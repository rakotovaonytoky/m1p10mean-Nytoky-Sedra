import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-card-progress',
  templateUrl: './car-card-progress.component.html',
  styleUrls: ['./car-card-progress.component.css']
})
export class CarCardProgressComponent implements OnInit {


  @Input() vColor!: any;
  @Input() vType!: any;
  @Input() date!: any;
  @Input() licencePlate!: any;
  constructor() { }

  ngOnInit(): void {
  }

}
