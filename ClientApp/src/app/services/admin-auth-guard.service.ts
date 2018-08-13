import { Injectable } from '@angular/core';
import { CanActivate } from '../../../node_modules/@angular/router';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

@Injectable()
export class AdminAuthGuard extends AuthGuard {

    constructor(auth: AuthService) {
        super(auth);
    }

    canActivate() {
        var isAuthenticated = super.canActivate();

        return isAuthenticated ? this.auth.isInRole('Admin') : false;
    }
}