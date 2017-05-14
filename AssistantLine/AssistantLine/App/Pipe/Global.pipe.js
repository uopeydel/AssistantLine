"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var _ = require("underscore");
var GroupByPipe = (function () {
    function GroupByPipe() {
    }
    GroupByPipe.prototype.transform = function (value, field) {
        if (value !== undefined) {
            var groupedObj_1 = value.reduce(function (prev, cur) {
                if (!prev[cur[field]]) {
                    prev[cur[field]] = [cur];
                }
                else {
                    prev[cur[field]].push(cur);
                }
                return prev;
            }, {});
            var newGroupByObj = Object.keys(groupedObj_1).map(function (key) { return ({ key: key, value: groupedObj_1[key] }); });
            //console.log('newGroupByObj');
            //console.log(newGroupByObj);
            return newGroupByObj;
        }
        else {
            return value;
        }
    };
    return GroupByPipe;
}());
GroupByPipe = __decorate([
    core_1.Pipe({ name: 'groupBy' })
], GroupByPipe);
exports.GroupByPipe = GroupByPipe;
var ReversePipe = (function () {
    function ReversePipe() {
    }
    ReversePipe.prototype.transform = function (value) {
        return value.slice().reverse();
    };
    return ReversePipe;
}());
ReversePipe = __decorate([
    core_1.Pipe({ name: 'reverse' })
], ReversePipe);
exports.ReversePipe = ReversePipe;
var ColorStatusOnlinePipe = (function () {
    function ColorStatusOnlinePipe() {
    }
    ColorStatusOnlinePipe.prototype.transform = function (value) {
        var trans = [
            { key: 'offline', value: '#B2B1BB' },
            { key: 'online', value: '#7FB3D5' },
            { key: 'busy', value: '#F1948A' },
        ];
        return _.findWhere(trans, { key: value }).value;
    };
    return ColorStatusOnlinePipe;
}());
ColorStatusOnlinePipe = __decorate([
    core_1.Pipe({ name: 'colorStatusOnline' })
], ColorStatusOnlinePipe);
exports.ColorStatusOnlinePipe = ColorStatusOnlinePipe;
//Waiting 1   OnTalk 2
var CustomerActiveStatusPipe = (function () {
    function CustomerActiveStatusPipe() {
    }
    CustomerActiveStatusPipe.prototype.transform = function (value) {
        var trans = [
            { key: 1, statusName: 'Waiting' },
            { key: 2, statusName: 'OnTalk' },
        ];
        return _.findWhere(trans, { key: value }).statusName;
    };
    return CustomerActiveStatusPipe;
}());
CustomerActiveStatusPipe = __decorate([
    core_1.Pipe({ name: 'CustomerActiveStatus' })
], CustomerActiveStatusPipe);
exports.CustomerActiveStatusPipe = CustomerActiveStatusPipe;
//Online 1  Offline 2 Busy 3
var AgentActiveStatusPipe = (function () {
    function AgentActiveStatusPipe() {
    }
    AgentActiveStatusPipe.prototype.transform = function (value) {
        var trans = [
            { key: 1, statusName: 'Online' },
            { key: 2, statusName: 'Offline' },
            { key: 3, statusName: 'Busy' },
        ];
        return _.findWhere(trans, { key: value }).statusName;
    };
    return AgentActiveStatusPipe;
}());
AgentActiveStatusPipe = __decorate([
    core_1.Pipe({ name: 'AgentActiveStatus' })
], AgentActiveStatusPipe);
exports.AgentActiveStatusPipe = AgentActiveStatusPipe;
//# sourceMappingURL=Global.pipe.js.map