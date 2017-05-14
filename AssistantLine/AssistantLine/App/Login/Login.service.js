"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
//import { Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var router_1 = require("@angular/router");
//import { CookieService } from 'angular2-cookie/core';
var material_1 = require("@angular/material");
//import * as moment from 'moment';
var LoginService = (function () {
    function LoginService(
        //private location: Location, 
        activatedRoute, 
        //private _cookieService: CookieService,
        router, snackBar) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.snackBar = snackBar;
    }
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        material_1.MdSnackBar])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=Login.service.js.map