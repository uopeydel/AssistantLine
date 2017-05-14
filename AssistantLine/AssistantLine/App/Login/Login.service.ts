import { Injectable } from '@angular/core';
//import { Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { /*LocationStrategy, PlatformLocation, Location */ } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
//import { CookieService } from 'angular2-cookie/core';
import { MdSnackBar } from '@angular/material';

import * as _ from 'underscore';
//import * as moment from 'moment';

@Injectable()
export class LoginService {
    constructor(
        //private location: Location, 
        private activatedRoute: ActivatedRoute,
        //private _cookieService: CookieService,
        private router: Router,
        private snackBar: MdSnackBar
    ) {

    }


}