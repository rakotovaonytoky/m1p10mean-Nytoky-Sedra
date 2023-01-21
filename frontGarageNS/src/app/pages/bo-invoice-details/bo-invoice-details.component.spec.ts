import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoInvoiceDetailsComponent } from './bo-invoice-details.component';

describe('BoInvoiceDetailsComponent', () => {
  let component: BoInvoiceDetailsComponent;
  let fixture: ComponentFixture<BoInvoiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoInvoiceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
