import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTypeColorComponent } from './car-type-color.component';

describe('CarTypeColorComponent', () => {
  let component: CarTypeColorComponent;
  let fixture: ComponentFixture<CarTypeColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarTypeColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarTypeColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
