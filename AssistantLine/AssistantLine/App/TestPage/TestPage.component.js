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
var material_1 = require("@angular/material");
var PageNotFound_component_1 = require("../PageNotFound/PageNotFound.component");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/startWith");
var angular_2_local_storage_1 = require("angular-2-local-storage");
var http_1 = require("@angular/http");
var TESTauth_1 = require("../../App/TESTauth");
var TestPageComponent = (function () {
    function TestPageComponent(dialog, http, AuthService, aaa) {
        var _this = this;
        this.dialog = dialog;
        this.http = http;
        this.AuthService = AuthService;
        this.aaa = aaa;
        this.states = [
            { namex: 'xa', lastnamex: 'xw' },
            { namex: 'qa', lastnamex: 'qe' },
            { namex: 'sa', lastnamex: 'sd' },
            { namex: 'sa', lastnamex: 'sf' },
            { namex: 'ea', lastnamex: 'ef' }
        ];
        this.projects = [
            { Pnamex: 'Proj00', Plastnamex: 'ja' },
            { Pnamex: 'Proj01', Plastnamex: 'qe' },
            { Pnamex: 'Proj02', Plastnamex: 'sd' },
            { Pnamex: 'Proj03', Plastnamex: 'sf' },
            { Pnamex: 'Proj04', Plastnamex: 'ef' }
        ];
        //##########################################
        //###
        this.arrayx = [];
        this.sum = 15;
        this.throttle = 10; //throttle must less than sum
        this.scrollDistance = 1;
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.projectCtrl = new forms_1.FormControl();
        this.projectCtrl.setValue('asdw starter value');
        this.filteredProjects = this.projectCtrl.valueChanges
            .startWith(null)
            .map(function (proj) { return _this.filterProjects(proj); });
        this.stateCtrl = new forms_1.FormControl();
        this.filteredStates = this.stateCtrl.valueChanges
            .startWith(null)
            .map(function (name) { return _this.filterStates(name); });
        //######### inf score
        this.addItems(0, this.sum);
    }
    //document.cookie = 'test01=value01;expires=' + moment('2039-02-20').toDate() + ';';
    TestPageComponent.prototype.openDialog = function () {
        console.log(this.projectCtrl.value);
        //console.log(moment('2016-01-01'));
        //console.log('xxx test ' + _.isNull(null) + " as " + _.isNull('qwer') + ' ' + _.isArray('asd') + ' ' + _.isArray([{'qq':963}, {'ww':48}]));
        this.dialog.open(PageNotFound_component_1.PageNotFoundComponent);
    };
    //##################################
    //##################################
    TestPageComponent.prototype.clickOptionState = function (data) {
        console.log(data);
    };
    TestPageComponent.prototype.overStates = function (state, index) {
        console.log(state, index);
        //console.log(this.states.length);
        if (this.states.length - 1 == index) {
            this.states.push({ namex: 'add' + index, lastnamex: 'lad' + index });
        }
    };
    TestPageComponent.prototype.filterStates = function (val) {
        return val ? this.states.filter(function (s) { return new RegExp(val, 'gi').test(s.namex + s.lastnamex); }) : this.states;
    };
    TestPageComponent.prototype.ngOnInit = function () {
        console.log(this.aaa.get('asd'));
        this.call()
            .subscribe(function (data) {
            console.log('data   : ', data);
        }, function (error) {
            console.log(error);
        });
    };
    TestPageComponent.prototype.call = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        var objJson = JSON.stringify({ 'objJson': 'qwe' });
        var apiroot = 'api/testpost';
        return this.AuthService.post(apiroot, objJson, options).map(function (res) { return res.json(); });
    };
    ;
    TestPageComponent.prototype.clickOptionProject = function (data) {
        console.log(data);
    };
    TestPageComponent.prototype.overProjects = function (project, index) {
        console.log(project, index);
        //console.log(this.projects.length);
        if (this.projects.length - 1 == index) {
            this.projects.push({ Pnamex: 'Proj0' + index + 1, Plastnamex: 'qwe' + index + 1 });
        }
    };
    TestPageComponent.prototype.filterProjects = function (val) {
        return val ? this.projects.filter(function (s) { return new RegExp(val, 'gi').test(s.Pnamex); }) : this.projects;
    };
    TestPageComponent.prototype.addItems = function (startIndex, endIndex) {
        for (var i = 0; i < this.sum; ++i) {
            this.arrayx.push([i, ' ', this.generateWord(i)].join(''));
        }
    };
    TestPageComponent.prototype.onScrollDown = function () {
        console.log('scrolled!!');
        // add another 20 items
        var start = this.sum;
        this.sum += 3;
        this.addItems(start, this.sum);
    };
    TestPageComponent.prototype.generateWord = function (ind) {
        return 'xx ' + ind;
    };
    return TestPageComponent;
}());
TestPageComponent = __decorate([
    core_1.Component({
        selector: 'TestPage',
        styles: [" \n    .search-results {\n      height: 300px;\n      overflow-y: scroll;\n    }"],
        templateUrl: '../app/TestPage/TestPage.html'
    }),
    __metadata("design:paramtypes", [material_1.MdDialog,
        http_1.Http,
        TESTauth_1.authInterceptorService,
        angular_2_local_storage_1.LocalStorageService])
], TestPageComponent);
exports.TestPageComponent = TestPageComponent;
//# sourceMappingURL=TestPage.component.js.map