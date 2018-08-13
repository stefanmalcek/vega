import { Injectable } from '@angular/core';
import { CanActivate } from '../../../node_modules/@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected auth: AuthService) { }

    canActivate() {
        if (this.auth.isAuthenticated())
            return true;

        this.auth.login();
        return false;
    }
}