import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInvoiceDetailsComponent } from './car-invoice-details.component';

describe('CarInvoiceDetailsComponent', () => {
  let component: CarInvoiceDetailsComponent;
  let fixture: ComponentFixture<CarInvoiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarInvoiceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
