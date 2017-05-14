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
var router_1 = require("@angular/router");
//import { CookieService } from 'angular2-cookie/core';
var Assistant_service_1 = require("./Assistant.service");
var AssistantComponent = (function () {
    function AssistantComponent(assistantService, router) {
        this.assistantService = assistantService;
        this.router = router;
        this.chatDataList = [
            {
                displayName: 'name 1',
                displayImage: '../../Content/image/show/delete.png',
                userType: 1,
                timeStamp: '11:11:11',
                messageText: 'Message ทดสอบ บทสนทนา 99999999999999999999999999999999999999 88888888888888888888888888888888888 7777777777777777777777777777777777',
                messageType: 1,
            },
            {
                displayName: 'name 1',
                displayImage: '../../Content/image/show/delete.png',
                userType: 1,
                timeStamp: '11:11:12',
                messageText: '../../Content/image/show/add.png',
                messageType: 2,
            },
            {
                displayName: 'u_name1',
                displayImage: '../../Content/image/show/delete.png',
                userType: 2,
                timeStamp: '11:11:13',
                messageText: 'Message ทดสอบ บทสนทนา 99999999999999999999999999999999999999 88888888888888888888888888888888888 7777777777777777777777777777777777',
                messageType: 1,
            },
            {
                displayName: 'u_name1',
                displayImage: '../../Content/image/show/delete.png',
                userType: 2,
                timeStamp: '11:11:14',
                messageText: '../../Content/image/show/add.png',
                messageType: 2,
            }
        ];
        this.AssistantList = [
            {
                AgentId: '001',
                AgentName: 'Agent001',
                AgentDepartment: 'Sales',
                AgentLanguage: ['EN', 'JP', 'TH'],
                AgentActiveStatus: 1 //Online 1  Offline2 Busy3
            },
            {
                AgentId: '002',
                AgentName: 'Agent002',
                AgentDepartment: 'Claim',
                AgentLanguage: ['EN', 'JP', 'TH'],
                AgentActiveStatus: 2 //Online 1  Offline2 Busy3
            },
            {
                AgentId: '003',
                AgentName: 'Agent003',
                AgentDepartment: 'Sales',
                AgentLanguage: ['EN', 'TH'],
                AgentActiveStatus: 3 //Online 1  Offline2 Busy3
            },
            {
                AgentId: '004',
                AgentName: 'Agent004',
                AgentDepartment: 'Claim',
                AgentLanguage: ['TH'],
                AgentActiveStatus: 1 //Online 1  Offline2 Busy3
            }
        ];
        this.CustomerList = [
            {
                CustomerId: '001',
                CustomerName: 'user_a',
                CustomerActiveStatus: 1,
                CustomerUnreadMessage: 0
            },
            {
                CustomerId: '002',
                CustomerName: 'user_b',
                CustomerActiveStatus: 2,
                CustomerUnreadMessage: 1
            },
            {
                CustomerId: '003',
                CustomerName: 'user_c',
                CustomerActiveStatus: 1,
                CustomerUnreadMessage: 0
            },
            {
                CustomerId: '004',
                CustomerName: 'user_d',
                CustomerActiveStatus: 2,
                CustomerUnreadMessage: 15
            },
            {
                CustomerId: '005',
                CustomerName: 'user_e',
                CustomerActiveStatus: 2,
                CustomerUnreadMessage: 3
            }
        ];
        this.assistantService;
    }
    AssistantComponent.prototype.ngOnInit = function () {
        //this.scrollToBottom();
    };
    AssistantComponent.prototype.ngAfterViewChecked = function () {
        //this.scrollToBottom();
    };
    AssistantComponent.prototype.scrollToBottom = function () {
        try {
            console.log('do down');
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) {
        }
        //console.log(this.myScrollContainer.nativeElement.offsetHeight);
        //console.log(this.myScrollContainer.nativeElement.scrollHeight);
        //console.log(this.myScrollContainer.nativeElement.scrollTop);
        //try {
        //    if (this.myScrollContainer.nativeElement.scrollTop != this.myScrollContainer.nativeElement.scrollHeight)
        //    {
        //        console.log(this.myScrollContainer.nativeElement.scrollTop, this.myScrollContainer.nativeElement.scrollHeight);
        //        this.subscription = Observable.interval(100).subscribe(x => {
        //            this.myScrollContainer.nativeElement.scrollTop++;
        //        });
        //    }
        //} catch (err) {
        //    this.subscription.remove();
        //}
    };
    AssistantComponent.prototype.postTextToLineCli = function () {
        this.scrollToBottom();
        //$(document).ready(function () {
        //    $("#chatBox").scrollTop(1000);
        //});
        //$(document).ready(function () {
        //    var chatHeight = $('#chatBox').height();
        //    //console.log(chatHeight);
        //    $('#chatBox').animate({
        //        scrollTop: chatHeight*2
        //    }, chatHeight*2);
        //});
    };
    return AssistantComponent;
}());
__decorate([
    core_1.ViewChild('scrollMe'),
    __metadata("design:type", core_1.ElementRef)
], AssistantComponent.prototype, "myScrollContainer", void 0);
AssistantComponent = __decorate([
    core_1.Component({
        selector: 'Assistant',
        styles: [""],
        templateUrl: '../App/Assistant/Assistant.html'
    }),
    __metadata("design:paramtypes", [Assistant_service_1.AssistantService,
        router_1.Router])
], AssistantComponent);
exports.AssistantComponent = AssistantComponent;
//# sourceMappingURL=Assistant.component.js.map