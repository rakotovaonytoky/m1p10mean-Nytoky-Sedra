import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoCarDepotDetailComponent } from './bo-car-depot-detail.component';

describe('BoCarDepotDetailComponent', () => {
  let component: BoCarDepotDetailComponent;
  let fixture: ComponentFixture<BoCarDepotDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoCarDepotDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoCarDepotDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
