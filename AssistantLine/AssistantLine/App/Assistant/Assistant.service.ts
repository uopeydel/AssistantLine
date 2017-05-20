import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
export class AssistantService {
    constructor(
        //private location: Location, 
        private activatedRoute: ActivatedRoute,
        //private _cookieService: CookieService,
        private router: Router,
        private snackBar: MdSnackBar,
        private http: Http
    ) {
       
    }

    public postMessageJsonObj(obj : any) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        let objJson: string = JSON.stringify(obj);
        let apiroot =  'messageLineToCustomer';
        //let apiroot = 'api/values/5';
        return this.http.post(apiroot, objJson, options).map(res => res.json());

    }

}