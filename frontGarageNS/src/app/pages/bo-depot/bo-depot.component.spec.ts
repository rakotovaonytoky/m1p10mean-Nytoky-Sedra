import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoDepotComponent } from './bo-depot.component';

describe('BoDepotComponent', () => {
  let component: BoDepotComponent;
  let fixture: ComponentFixture<BoDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
