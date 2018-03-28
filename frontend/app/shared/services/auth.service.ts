import { Injectable, OnInit } from '@angular/core';
// import { Response } from "@angular/http";
import { AuthResponse } from './auth.response';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService implements OnInit {
    public data: AuthResponse;
    constructor(private router: Router) { }

    checkAuth() {
        // let token = localStorage.getItem('authToken');
        console.log('Checking authentication token now');
    }

    redirect(location = null) {
        if (!location) {
            this.router.navigate(['/login']);
        } else {
            this.router.navigate([location]);
        }

    }

    isAuthenticated(): boolean {
        console.log('Storage contents: ', localStorage.getItem('authToken'));
        const token = localStorage.getItem('authToken');
        return true ? token !== undefined && token !== null : false;
    }

    setToken(token) {
        return localStorage.setItem('authToken', token);
    }

    token() {
        return localStorage.getItem('authToken');
    }

    clear() {
        localStorage.removeItem('authToken');
    }

    setResponseData(message, code) {
        this.data = new AuthResponse(message, code);
    }

    ngOnInit() {
    }
}
