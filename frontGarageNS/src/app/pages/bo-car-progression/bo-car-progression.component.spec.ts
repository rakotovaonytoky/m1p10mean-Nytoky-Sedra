import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoCarProgressionComponent } from './bo-car-progression.component';

describe('BoCarProgressionComponent', () => {
  let component: BoCarProgressionComponent;
  let fixture: ComponentFixture<BoCarProgressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoCarProgressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoCarProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
