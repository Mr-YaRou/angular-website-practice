import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';



@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    users = null;
    idType : string;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;   
        
        this.accountService.getAll()
        .pipe(first())
        .subscribe(users => this.users = users);
    }

    getId(i : User){
        return this.users.find(x => x.id == i.id).idType;
    }

}