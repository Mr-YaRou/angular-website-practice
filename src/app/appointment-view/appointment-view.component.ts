import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from '@app/appointments.service';
import { RestService } from '@app/rest.service';
import { User } from '@app/_models';
import { Appointments } from '@app/_models/appointments';
import { AccountService, AlertService } from '@app/_services';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css']
})
export class AppointmentViewComponent implements OnInit {

  appointments: Appointments[] = [];
  searchTerm: string;
  appointment: Appointments[] = [];
  data: string

  ownappointments: Appointments[] = [];
  user: User;
  users = null;
  idType : string;

  confirmappointment : Appointments;
  confirmappointment2 : Appointments;
  form2: FormGroup;


  constructor(private rs : RestService, 
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) { 
    this.user = this.accountService.userValue;

    this.accountService.getAll()
    .pipe(first())
    .subscribe(users => this.users = users);

    this.rs.getAppointments().subscribe(
      (Response)=>
      {
        this.appointments = Response;
        this.ownappointments = this.appointments.filter(x => x.name.includes(this.user.firstName));
      },
      (error) => console.log(error)
      )
  }

  ngOnInit(): void {
    


  }

  getId(i : User){
    return this.users.find(x => x.id == i.id).idType;
  }

  deleteAppointment(id : string) {
    this.rs.deleteAppointment(id)
      .pipe(first())
      .subscribe(() =>{
        this.appointments = this.appointments.filter(x => x.id !== id)
      })


  }

  deleteownAppointment(id : string) {
    this.rs.deleteAppointment(id)
      .pipe(first())
      .subscribe(() =>{
        this.ownappointments = this.ownappointments.filter(x => x.id !== id);
        this.alertService.success('Appointment Deleted!', {keepAfterRouteChange: true });
        this.router.navigate(['../appointment'], {relativeTo: this.route});
      })
  }
}
