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
//import { authInterceptorService } from '../../app/builk-auth';
//import { ConfigurationService } from '../Configuration/Configuration.service';
var UploadFileService = (function () {
    function UploadFileService(http) {
        this.http = http;
        this.imgx = {};
    }
    UploadFileService.prototype.openFiles = function (evt) {
        this.fileForRead = evt.target.files[0];
    };
    UploadFileService.prototype.doUpload = function (objUpload) {
        //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        //let options = new RequestOptions({ headers: headers });
        //let objJson: string = JSON.stringify(objUpload);
        //let apiroot = this.config.root + 'saveimage/aws/kwanjai';
        //return this.http.post(apiroot, objJson, options).map(res => res.json());
    };
    UploadFileService.prototype.readFileto64encode = function (imgFile) {
        var _this = this;
        var reader = new FileReader();
        reader.onloadend = (function (f) {
            return function (e) {
                _this.file64 = e.target.result.split(',');
                return _this.file64[1];
                //console.log('file64', this.file64);
                //let filetype = this.fileForRead.type.split('/')[1];
                //this.upload64ToAWS(this.file64[1] , filetype , 'kwanjai');
            };
        })(imgFile);
        reader.readAsDataURL(imgFile);
    };
    //upload64ToAWS(this.file64[1] , 'jpg','kwanjai');
    //
    UploadFileService.prototype.upload64ToAWS = function (fileEncodeBase64, filetype, AWSbucketName) {
        //this.doUpload({ fileBase64: fileEncodeBase64 , fileExtension: filetype, bucketName: AWSbucketName })
        //    .subscribe((data: any) => {
        //        console.log('file path: ', data);
        //        return data ;
        //    }, (error: any) => {
        //        console.log(error);
        //    });
    };
    return UploadFileService;
}());
UploadFileService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UploadFileService);
exports.UploadFileService = UploadFileService;
//# sourceMappingURL=UploadFile.service.js.map