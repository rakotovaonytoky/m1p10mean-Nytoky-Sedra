import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCardProgressComponent } from './car-card-progress.component';

describe('CarCardProgressComponent', () => {
  let component: CarCardProgressComponent;
  let fixture: ComponentFixture<CarCardProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCardProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCardProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
