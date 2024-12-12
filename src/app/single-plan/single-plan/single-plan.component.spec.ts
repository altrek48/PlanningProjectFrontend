import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlanComponent } from './single-plan.component';

describe('SinglePlanComponent', () => {
  let component: SinglePlanComponent;
  let fixture: ComponentFixture<SinglePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
