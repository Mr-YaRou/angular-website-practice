import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { first } from 'rxjs/operators';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {

    title = 'angular-assignment-2';
    
    user: User;
    users = null;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    getId(i : User){
        return this.users.find(x => x.id == i.id).idType;
    }

    ngOnInit() {
        this.accountService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
    }

    logout() {
        this.accountService.logout();
    }
}