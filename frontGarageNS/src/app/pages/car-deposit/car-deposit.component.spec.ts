import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDepositComponent } from './car-deposit.component';

describe('CarDepositComponent', () => {
  let component: CarDepositComponent;
  let fixture: ComponentFixture<CarDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
