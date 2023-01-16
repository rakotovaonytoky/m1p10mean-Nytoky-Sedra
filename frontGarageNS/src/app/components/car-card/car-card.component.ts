import { Car } from './../../classes/car';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {

  @Input() vColor!: any;
  @Input() vType!: any;
  @Input() brand!: any;
  @Input() model!: any;
  @Input() licensePlate!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
