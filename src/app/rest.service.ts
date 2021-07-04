import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointments } from './_models/appointments';
import { BehaviorSubject } from 'rxjs';

import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Slots } from './_models/slots';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  url : string = "http://localhost:4200/appointments2/"

  url2 : string = "http://localhost:3000/clinic-open/"


  private appointmentSubject: BehaviorSubject<Appointments>;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  public get appointmentValue(): Appointments {
    return this.appointmentSubject.value;
  }

  getById(id : string) {
    return this.http.get<Appointments>(this.url + id);
  }

  //Create
  createAppointment(appointment : Appointments){
    return this.http.post<Appointments>(this.url,JSON.stringify(appointment),this.httpOptions);
  }
 
  // Read
  getAppointments(){
    return this.http.get<Appointments[]>(this.url);
  }
  getSlots(){
    return this.http.get<Slots[]>(this.url2);
  }

  //Update
  updateAppointment(id, appointment): Observable<Appointments> {
    return this.http.put<Appointments>(this.url + id, JSON.stringify(appointment), this.httpOptions);
  }
  //Update
  confirmAppointment(id : string) {
    const obj = {"status":"Confirmed"};
    return this.http.patch<Appointments>(this.url + id ,JSON.stringify(obj), this.httpOptions);
  }

  //Delete
  deleteAppointment(id : string) {
      return this.http.delete<Appointments>(this.url + id);
  }

}
