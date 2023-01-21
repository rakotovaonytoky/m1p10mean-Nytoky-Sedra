import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() pageDescription!: any;
  @Input() pageimage!: any;
  constructor() { }

  ngOnInit(): void {
    if (!this.pageimage) {
      this.pageimage = "/assets/img/slider-img.png";
    }
  }

}
