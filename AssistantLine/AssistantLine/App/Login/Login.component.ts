import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { CookieService } from 'angular2-cookie/core';
import { LoginService } from './Login.service';

@Component({
    selector: 'Login',
    styles: [``],
    templateUrl: '../App/Login/Login.html'
})
export class LoginComponent {
    constructor(
        private loginService: LoginService,
        private router: Router,

    ) {
        this.loginService;
    }

    private username: string;
    private password: string;
    private login() {
        this.router.navigateByUrl('/Assistant');
        //Assistant
        //Management
    }
} 
