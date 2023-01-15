import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRepairProgressionComponent } from './car-repair-progression.component';

describe('CarRepairProgressionComponent', () => {
  let component: CarRepairProgressionComponent;
  let fixture: ComponentFixture<CarRepairProgressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarRepairProgressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRepairProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
