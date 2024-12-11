import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlainComponent } from './create-plain.component';

describe('CreatePlainComponent', () => {
  let component: CreatePlainComponent;
  let fixture: ComponentFixture<CreatePlainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
