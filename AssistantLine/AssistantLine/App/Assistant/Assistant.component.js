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
var _ = require("underscore");
var UploadFile_service_1 = require("../../App/OtherService/UploadFile.service");
var AssistantComponent = (function () {
    function AssistantComponent(assistantService, router, uploadFile) {
        this.assistantService = assistantService;
        this.router = router;
        this.uploadFile = uploadFile;
        this.AgentSelected = {};
        this.CustomerSelected = {};
        this.message = "";
        this.fileToSave = undefined;
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
                Customer_UID: 'U123',
                CustomerName: 'user_a',
                CustomerActiveStatus: 1,
                CustomerUnreadMessage: 0
            },
            {
                CustomerId: '002',
                Customer_UID: 'U123',
                CustomerName: 'user_b',
                CustomerActiveStatus: 2,
                CustomerUnreadMessage: 1
            },
            {
                CustomerId: '003',
                Customer_UID: 'U123',
                CustomerName: 'user_c',
                CustomerActiveStatus: 1,
                CustomerUnreadMessage: 0
            },
            {
                CustomerId: '004',
                Customer_UID: 'U123',
                CustomerName: 'user_d',
                CustomerActiveStatus: 2,
                CustomerUnreadMessage: 15
            },
            {
                CustomerId: '005',
                Customer_UID: 'U123',
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
            console.log('err => ', err);
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
    AssistantComponent.prototype.chooseImg = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.onloadend = (function (f) {
            return function (e) {
                _this.IMGFILE = e.target.result;
            };
        })(event.target.files[0]);
        reader.readAsDataURL(event.target.files[0]);
    };
    AssistantComponent.prototype.postJsonData = function () {
        var jsonPOST = {
            events: [
                {
                    replyToken: "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
                    type: "message",
                    timestamp: 1462629479859,
                    source: {
                        type: "user",
                        userId: this.AgentSelected.AgentId
                    },
                    message: {
                        id: "325708",
                        type: "text",
                        text: this.CustomerSelected.Customer_UID + '*' + this.message
                    }
                }
            ]
        };
        this.assistantService.postMessageJsonObj(jsonPOST)
            .subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    AssistantComponent.prototype.trysavefile = function () {
        if (_.isUndefined(this.fileToSave)) {
            console.log('have no file for upload');
            return "error#text";
        }
        else {
            console.log('wait for upload');
        }
        // console.log(this.fileread);
        var fileStr = this.uploadFile.readFileto64encode(this.IMGFILE); // this.fileread + "";
        var fileStrSplite = fileStr.split(',');
        var fileBase64 = fileStrSplite[1];
        var fileType = this.fileToSave.type.split('/');
        console.log(this.fileToSave.type, fileType[0]);
        if (fileType[0] === 'image' || fileType[0] === 'video' || fileType[0] === 'audio') {
        }
        else {
            return "error#text";
        }
    };
    AssistantComponent.prototype.postTextToLineCli = function () {
        this.scrollToBottom();
        var sendType = this.trysavefile();
        var jsonPOST = {};
        var specialText = "!*!";
        if (sendType[0] == "image") {
            //send image
            jsonPOST = {
                "events": [
                    {
                        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
                        "type": "message",
                        "timestamp": 1462629479859,
                        "source": {
                            "type": "user",
                            "userId": this.AgentSelected.AgentId
                        },
                        "message": {
                            "id": "325708",
                            "type": "image",
                            "originalContentUrl": this.CustomerSelected.Customer_UID + specialText + sendType[1],
                            "previewImageUrl": this.CustomerSelected.Customer_UID + specialText + sendType[1]
                        }
                    }
                ]
            };
        }
        else if (sendType[0] == "video") {
            //send video
            jsonPOST = {
                "events": [
                    {
                        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
                        "type": "message",
                        "timestamp": 1462629479859,
                        "source": {
                            "type": "user",
                            "userId": this.AgentSelected.AgentId
                        },
                        "message": {
                            "id": "325708",
                            "type": "video",
                            "originalContentUrl": this.CustomerSelected.Customer_UID + specialText + sendType[1],
                            "previewImageUrl": this.CustomerSelected.Customer_UID + specialText + sendType[1]
                        }
                    }
                ]
            };
        }
        else if (sendType[0] == "audio") {
            //send audio
            jsonPOST = {
                "events": [
                    {
                        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
                        "type": "message",
                        "timestamp": 1462629479859,
                        "source": {
                            "type": "user",
                            "userId": this.AgentSelected.AgentId
                        },
                        "message": {
                            "id": "325708",
                            "type": "audio",
                            "originalContentUrl": this.CustomerSelected.Customer_UID + specialText + sendType[1],
                            "duration": 240000
                        }
                    }
                ]
            };
        }
        else if (sendType[0] == "location") {
            //send location
            jsonPOST = {
                "events": [
                    {
                        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
                        "type": "message",
                        "timestamp": 1462629479859,
                        "source": {
                            "type": "user",
                            "userId": this.AgentSelected.AgentId
                        },
                        "message": {
                            "id": "325708",
                            "type": "location",
                            "title": "my location",
                            "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
                            "latitude": 35.65910807942215,
                            "longitude": 139.70372892916203
                        }
                    }
                ]
            };
        }
        else if (sendType[0] == "sticker") {
            //send sticker
            jsonPOST = {
                "events": [
                    {
                        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
                        "type": "message",
                        "timestamp": 1462629479859,
                        "source": {
                            "type": "user",
                            "userId": this.AgentSelected.AgentId
                        },
                        "message": {
                            "id": "325708",
                            "type": "sticker",
                            "packageId": "1",
                            "stickerId": "1" //which sticker 1-93+....
                        }
                    }
                ]
            };
        }
        else if (sendType[0] == "imagemap") {
            //send imagemap
            jsonPOST = {
                "events": [
                    {
                        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
                        "type": "message",
                        "timestamp": 1462629479859,
                        "source": {
                            "type": "user",
                            "userId": this.AgentSelected.AgentId
                        },
                        "message": {
                            "id": "325708",
                            "type": "imagemap",
                            "baseUrl": "https://example.com/bot/images/rm001",
                            "altText": "this is an imagemap",
                            "baseSize": {
                                "height": 1040,
                                "width": 1040
                            },
                            "actions": [
                                {
                                    "type": "uri",
                                    "linkUri": "https://example.com/",
                                    "area": {
                                        "x": 0,
                                        "y": 0,
                                        "width": 520,
                                        "height": 1040
                                    }
                                },
                                {
                                    "type": "message",
                                    "text": "hello",
                                    "area": {
                                        "x": 520,
                                        "y": 0,
                                        "width": 520,
                                        "height": 1040
                                    }
                                }
                            ]
                        }
                    }
                ]
            };
        }
        else if (sendType[0] == "template") {
            //send template
            jsonPOST = {
                "events": [
                    {
                        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
                        "type": "message",
                        "timestamp": 1462629479859,
                        "source": {
                            "type": "user",
                            "userId": this.AgentSelected.AgentId
                        },
                        "message": {
                            "id": "325708",
                            "type": "buttons",
                            "altText": "this is a buttons template",
                            "template": {
                                "type": "buttons",
                                "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
                                "title": "Menu",
                                "text": "Please select",
                                "actions": [
                                    {
                                        "type": "postback",
                                        "label": "Buy",
                                        "data": "action=buy&itemid=123"
                                    },
                                    {
                                        "type": "postback",
                                        "label": "Add to cart",
                                        "data": "action=add&itemid=123"
                                    },
                                    {
                                        "type": "uri",
                                        "label": "View detail",
                                        "uri": "http://example.com/page/123"
                                    }
                                ]
                            }
                        }
                    }
                ]
            };
        }
        else if (sendType[0] == "carouseltemplate") {
            //send carouseltemplate
            jsonPOST = {
                "events": [
                    {
                        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
                        "type": "message",
                        "timestamp": 1462629479859,
                        "source": {
                            "type": "user",
                            "userId": this.AgentSelected.AgentId
                        },
                        "message": {
                            "id": "325708",
                            "type": "buttons",
                            "altText": "this is a buttons template",
                            "template": {
                                "type": "carousel",
                                "columns": [
                                    {
                                        "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
                                        "title": "this is menu",
                                        "text": "description",
                                        "actions": [
                                            {
                                                "type": "postback",
                                                "label": "Buy",
                                                "data": "action=buy&itemid=111"
                                            },
                                            {
                                                "type": "postback",
                                                "label": "Add to cart",
                                                "data": "action=add&itemid=111"
                                            },
                                            {
                                                "type": "uri",
                                                "label": "View detail",
                                                "uri": "http://example.com/page/111"
                                            }
                                        ]
                                    },
                                    {
                                        "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
                                        "title": "this is menu",
                                        "text": "description",
                                        "actions": [
                                            {
                                                "type": "postback",
                                                "label": "Buy",
                                                "data": "action=buy&itemid=222"
                                            },
                                            {
                                                "type": "postback",
                                                "label": "Add to cart",
                                                "data": "action=add&itemid=222"
                                            },
                                            {
                                                "type": "uri",
                                                "label": "View detail",
                                                "uri": "http://example.com/page/222"
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                ]
            };
        }
        else if (sendType[0] == "confirmtemplate") {
            //send confirmtemplate
            jsonPOST = {
                "events": [
                    {
                        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
                        "type": "message",
                        "timestamp": 1462629479859,
                        "source": {
                            "type": "user",
                            "userId": this.AgentSelected.AgentId
                        },
                        "message": {
                            "id": "325708",
                            "type": "buttons",
                            "altText": "this is a buttons template",
                            "template": {
                                "type": "confirm",
                                "text": "Are you sure?",
                                "actions": [
                                    {
                                        "type": "message",
                                        "label": "Yes",
                                        "text": "yes"
                                    },
                                    {
                                        "type": "message",
                                        "label": "No",
                                        "text": "no"
                                    }
                                ]
                            }
                        }
                    }
                ]
            };
        }
        else {
            jsonPOST = {
                "events": [
                    {
                        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
                        "type": "message",
                        "timestamp": 1462629479859,
                        "source": {
                            "type": "user",
                            "userId": this.AgentSelected.AgentId
                        },
                        "message": {
                            "id": "325708",
                            "type": "text",
                            "text": this.CustomerSelected.Customer_UID + '*' + this.message
                        }
                    }
                ]
            };
        }
        //jsonPOST.events[0].message = this.message;
        //- post
        //$http({
        //    method: 'POST',
        //    url: 'api/nnn/',
        //    data: jsonPOST
        //}).then(function (data, status) {
        //    console.log(data, 'suc post nnn ' + status);
        //}, function (data, status) {
        //    console.log(data, 'err getUser' + status);
        //})
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
        router_1.Router,
        UploadFile_service_1.UploadFileService])
], AssistantComponent);
exports.AssistantComponent = AssistantComponent;
//# sourceMappingURL=Assistant.component.js.map