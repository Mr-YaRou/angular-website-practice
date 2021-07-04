import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsConfirmComponent } from './appointments-confirm.component';

describe('AppointmentsConfirmComponent', () => {
  let component: AppointmentsConfirmComponent;
  let fixture: ComponentFixture<AppointmentsConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
