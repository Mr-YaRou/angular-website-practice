import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '@app/rest.service';
import { User } from '@app/_models';
import { Appointments } from '@app/_models/appointments';
import { Slots } from '@app/_models/slots';
import { AccountService, AlertService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-appointments-create',
  templateUrl: './appointments-create.component.html',
  styleUrls: ['./appointments-create.component.css']
})
export class AppointmentsCreateComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  user : User

  slots : Slots[] = [];
  nrSelect = "GP Clinic 1";
  nrSelect2 = "GP Clinic 1";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private rs : RestService,
    private alertService: AlertService,
    private accountService : AccountService
    ) {
      this.user = this.accountService.userValue

    }

  ngOnInit(): void {
    this.rs.getSlots().subscribe(
      (Response) =>{
        this.slots = Response;
      }
    )

    this.form = this.formBuilder.group({
      clinic: ['', Validators.required],
      name: [this.user.firstName, Validators.required],
      date: ['', Validators.required],
      status: "Pending Confirmation"
    });
  }

      // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(){

    this.rs.createAppointment(this.form.value)
      .subscribe(
        data => {
          this.alertService.success('Appointment Created', {keepAfterRouteChange: true });
          this.router.navigate(['../'], {relativeTo: this.route});
        }
      )
    
  }

}
