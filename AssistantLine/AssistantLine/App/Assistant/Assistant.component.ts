import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { CookieService } from 'angular2-cookie/core';
import { AssistantService } from './Assistant.service';
import { Observable } from 'rxjs/Rx';
import * as _ from "underscore";
import { UploadFileService } from '../../App/OtherService/UploadFile.service';

@Component({
    selector: 'Assistant',
    styles: [``],
    templateUrl: '../App/Assistant/Assistant.html'
})
export class AssistantComponent implements OnInit, AfterViewChecked  {
    constructor(
        private assistantService: AssistantService,
        private router: Router,
        private uploadFile: UploadFileService 

    ) {
        this.assistantService;
    }
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    ngOnInit() {
        //this.scrollToBottom();
    }
    ngAfterViewChecked() {
        //this.scrollToBottom();
    }

    private AgentSelected: any = {} as any;
    private CustomerSelected: any = {} as any;
    private message: string ="";


    private subscription : any;
    scrollToBottom(): void {
        try {
            console.log('do down');
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err)
        {
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
    }
    
    private IMGFILE : any;
    private chooseImg(event: any) { 
        let reader = new FileReader();
        reader.onloadend = ((f) => {
            return (e: any) => {
                this.IMGFILE = e.target.result;
            };
        })(event.target.files[0]);
        reader.readAsDataURL(event.target.files[0]);
    }

    fileToSave : any = undefined;
    trysavefile () { 
        if (_.isUndefined(this.fileToSave)) {
            console.log('have no file for upload');
            return "error#text";
        }
        else {
            console.log('wait for upload');
        }
        // console.log(this.fileread);
        var fileStr = this.uploadFile.readFileto64encode(this.IMGFILE) as any;// this.fileread + "";
        var fileStrSplite = fileStr.split(',');

        var fileBase64 = fileStrSplite[1];
        var fileType = this.fileToSave.type.split('/');
        console.log(this.fileToSave.type, fileType[0]);

        if (fileType[0] === 'image' || fileType[0] === 'video' || fileType[0] === 'audio') {
            //$http({
            //    method: 'POST',
            //    url: 'api/uploadFile/savefile',
            //    data: fileBase64,
            //    params: {
            //        fileis: this.fileToSave.type//fileType
            //    }
            //}).then(function (data, status) {
            //    console.log(data, status);
            //    return fileType[0] + "#" + data.data;
            //}, function (data, status) {
            //    console.log(data, ' err upload ' + status);
            //    return "error#text";
            //})
        }
        else {
            return "error#text";
        }
    }

    postTextToLineCli () {
        this.scrollToBottom();
        var sendType = this.trysavefile();
        var jsonPOST = {}
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
            }
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
            }
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
            }
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
            }
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
                            "packageId": "1", //1 is default and free
                            "stickerId": "1" //which sticker 1-93+....
                        }
                    }
                ]
            }
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
            }
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
            }
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
            }
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
            }
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
            }
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
    }



    //--model
    userData: [
        {
            _userDisplayName: 'name0',
            _message : 'mess0'
        }
        ,
        {
            _userDisplayName: 'name1',
            _message: 'mess1'
        }
        ,
        {
            _userDisplayName: 'name2',
            _message: 'mess2'
        }
    ]

    chatDataList: any = [
        {
            displayName: 'name 1',
            displayImage: '../../Content/image/show/delete.png',
            userType: 1,// Assistance 1     Customer 2
            timeStamp: '11:11:11',
            messageText: 'Message ทดสอบ บทสนทนา 99999999999999999999999999999999999999 88888888888888888888888888888888888 7777777777777777777777777777777777',
            messageType:1,// 1text 2img 3sticker 4file
        }
        ,
        {
            displayName: 'name 1',
            displayImage: '../../Content/image/show/delete.png',
            userType: 1,
            timeStamp: '11:11:12',
            messageText: '../../Content/image/show/add.png',
            messageType: 2,// 1text 2img 3sticker 4file
        }
        ,
        {
            displayName: 'u_name1',
            displayImage: '../../Content/image/show/delete.png',
            userType: 2,
            timeStamp: '11:11:13',
            messageText: 'Message ทดสอบ บทสนทนา 99999999999999999999999999999999999999 88888888888888888888888888888888888 7777777777777777777777777777777777',
            messageType: 1,// 1text 2img 3sticker 4file
        }
        ,
        {
            displayName: 'u_name1',
            displayImage: '../../Content/image/show/delete.png',
            userType:2,
            timeStamp: '11:11:14',
            messageText: '../../Content/image/show/add.png',
            messageType:2,// 1text 2img 3sticker 4file
        }
        
        
    ]

    AssistantList: any = [
        {
            AgentId:'001',
            AgentName: 'Agent001',
            AgentDepartment :'Sales' ,
            AgentLanguage: ['EN', 'JP', 'TH'],
            AgentActiveStatus: 1 //Online 1  Offline2 Busy3
        }
        ,
        {
            AgentId: '002',
            AgentName: 'Agent002',
            AgentDepartment: 'Claim',
            AgentLanguage: ['EN', 'JP', 'TH'],
            AgentActiveStatus: 2 //Online 1  Offline2 Busy3
        }
        ,
        {
            AgentId: '003',
            AgentName: 'Agent003',
            AgentDepartment: 'Sales',
            AgentLanguage: ['EN','TH'],
            AgentActiveStatus: 3 //Online 1  Offline2 Busy3
        }
        ,
        {
            AgentId: '004',
            AgentName: 'Agent004',
            AgentDepartment: 'Claim',
            AgentLanguage: ['TH'],
            AgentActiveStatus: 1 //Online 1  Offline2 Busy3
        }
    ]

    CustomerList: any = [
        {
            CustomerId: '001',
            Customer_UID :'U123',
            CustomerName: 'user_a',
            CustomerActiveStatus: 1,    //Waiting 1   OnTalk2
            CustomerUnreadMessage:0
        },
        {
            CustomerId: '002',
            Customer_UID: 'U123',
            CustomerName: 'user_b',
            CustomerActiveStatus: 2,    //Waiting 1   OnTalk2
            CustomerUnreadMessage: 1
        },
        {
            CustomerId: '003',
            Customer_UID: 'U123',
            CustomerName: 'user_c',
            CustomerActiveStatus: 1,    //Waiting 1   OnTalk2
            CustomerUnreadMessage: 0
        },
        {
            CustomerId: '004',
            Customer_UID: 'U123',
            CustomerName: 'user_d',
            CustomerActiveStatus: 2,    //Waiting 1   OnTalk2
            CustomerUnreadMessage: 15
        },
        {
            CustomerId: '005',
            Customer_UID: 'U123',
            CustomerName: 'user_e',
            CustomerActiveStatus: 2,    //Waiting 1   OnTalk2
            CustomerUnreadMessage: 3
        }
    ]

} 
