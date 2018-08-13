import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

(window as any).global = window;

@Injectable()
export class AuthService {
    userProfile: any;
    private roles: string[] = [];

    auth0 = new auth0.WebAuth({
        clientID: 'W6zoIqGgmgjLpWPFcCHcIGzeFh6Lq4JD',
        domain: 'testangular.eu.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'http://localhost:5000',
        scope: 'openid profile'
    });

    constructor(public router: Router) { }

    public login(): void {
        this.auth0.authorize();
    }

    public getToken(): string {
        return localStorage.getItem('id_token');
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            console.log(authResult);
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
                this.router.navigate(['/home']);
            } else if (err) {
                this.router.navigate(['/home']);
                console.log(err);
            }
        });
    }

    public getProfile(cb): void {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('Access Token must exist to fetch profile');
        }

        const self = this;
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                self.userProfile = profile;
            }
            cb(err, profile);
        });
    }

    private setSession(authResult): void {
        // Set the time that the Access Token will expire at
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    private readUserFromLocalStorage() {
        //TODO：read roles and user profile
    }

    public isInRole(roleName) {return true;
        // this.roles.indexOf(roleName) > -1;
    }

    public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.userProfile = null;
        this.roles = [];
        // Go back to the home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // Access Token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
        return new Date().getTime() < expiresAt;
    }

}