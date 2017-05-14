"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
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
//# sourceMappingURL=Global.pipe.js.map