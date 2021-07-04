import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '@app/rest.service';
import { Appointments } from '@app/_models/appointments';
import { AlertService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-appointments-confirm',
  templateUrl: './appointments-confirm.component.html',
  styleUrls: ['./appointments-confirm.component.css']
})
export class AppointmentsConfirmComponent implements OnInit {

  form: FormGroup;
  id : string;


  appointment : Appointments;
  appointments = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private rs : RestService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.rs.getById(this.id).pipe(first()).subscribe(appointments => this.appointment = appointments);

    this.form = this.formBuilder.group({
      clinic: [this.appointment.clinic, Validators.required],
      name: [this.appointment.name, Validators.required],
      date: [this.appointment.date, Validators.required],
      status: "Confirmed"
    });

    this.rs.getById(this.id).pipe(first()).subscribe(x =>{
      this.f.clinic.setValue(x.clinic);
      this.f.name.setValue(x.name);
      this.f.date.setValue(x.date);
      this.f.status.setValue('Confirmed');
    })

  }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

  myFunction() {
    this.rs.confirmAppointment(this.id).pipe(first()).subscribe(
        data => {
          this.alertService.success('Appointment Confirmed', { keepAfterRouteChange: true });
          this.router.navigate(['.', { relativeTo: this.route }]);
        },
        error => {
          alert(this.id);
        }
    )

  }

}
