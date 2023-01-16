import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-type-color',
  templateUrl: './car-type-color.component.html',
  styleUrls: ['./car-type-color.component.css']
})
export class CarTypeColorComponent implements OnInit {

  @Input() color!: any;
  @Input('type') type!: any;

  constructor() { }

  ngOnInit(): void {
    // this.color = "#000000";

  }

}
