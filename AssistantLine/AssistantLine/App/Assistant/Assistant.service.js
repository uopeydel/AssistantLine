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
var http_1 = require("@angular/http");
//import { Observable } from 'rxjs/Observable';
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var router_1 = require("@angular/router");
//import { CookieService } from 'angular2-cookie/core';
var material_1 = require("@angular/material");
//import * as moment from 'moment';
var AssistantService = (function () {
    function AssistantService(
        //private location: Location, 
        activatedRoute, 
        //private _cookieService: CookieService,
        router, snackBar, http) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.snackBar = snackBar;
        this.http = http;
    }
    AssistantService.prototype.postMessageJsonObj = function (obj) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        var objJson = JSON.stringify(obj);
        var apiroot = 'messageLineToCustomer';
        //let apiroot = 'api/values/5';
        return this.http.post(apiroot, objJson, options).map(function (res) { return res.json(); });
    };
    return AssistantService;
}());
AssistantService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        material_1.MdSnackBar,
        http_1.Http])
], AssistantService);
exports.AssistantService = AssistantService;
//# sourceMappingURL=Assistant.service.js.map