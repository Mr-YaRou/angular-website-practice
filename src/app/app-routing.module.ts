import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';
import { AppointmentsConfirmComponent } from './appointments-confirm/appointments-confirm.component';
import { AppointmentsCreateComponent } from './appointments-create/appointments-create.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'forgotpw', component: ForgotPasswordComponent},
    { path: 'appointment', component: AppointmentViewComponent},
    { path: 'appointment/create', component: AppointmentsCreateComponent},
    { path: 'appointment/confirm/:id', component: AppointmentsConfirmComponent},


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }