import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoTemplateComponent } from './bo-template.component';

describe('BoTemplateComponent', () => {
  let component: BoTemplateComponent;
  let fixture: ComponentFixture<BoTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
