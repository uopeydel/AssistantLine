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
var AddNewMember_component_1 = require("./AddNewMember/AddNewMember.component");
var AddOldMember_component_1 = require("./AddOldMember/AddOldMember.component");
var AddNewORG_service_1 = require("./AddNewORG.service");
var AddNewORGComponent = (function () {
    function AddNewORGComponent(addNewORGService, dialog) {
        this.addNewORGService = addNewORGService;
        this.dialog = dialog;
    }
    AddNewORGComponent.prototype.openDialogAddNewMember = function () {
        this.dialog.open(AddNewMember_component_1.AddNewMemberComponent);
    };
    AddNewORGComponent.prototype.openDialogAddOldMember = function () {
        this.dialog.open(AddOldMember_component_1.AddOldMemberComponent);
    };
    return AddNewORGComponent;
}());
AddNewORGComponent = __decorate([
    core_1.Component({
        selector: 'AddNewORG',
        styles: [""],
        templateUrl: '../app/ListManager/AddNewORG/AddNewORG.html'
    }),
    __metadata("design:paramtypes", [AddNewORG_service_1.AddNewORGService, material_1.MdDialog])
], AddNewORGComponent);
exports.AddNewORGComponent = AddNewORGComponent;
//# sourceMappingURL=AddNewORG.component.js.map