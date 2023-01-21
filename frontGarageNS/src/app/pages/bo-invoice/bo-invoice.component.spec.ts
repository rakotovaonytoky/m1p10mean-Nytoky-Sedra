import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoInvoiceComponent } from './bo-invoice.component';

describe('BoInvoiceComponent', () => {
  let component: BoInvoiceComponent;
  let fixture: ComponentFixture<BoInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
