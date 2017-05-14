import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { authInterceptorService } from '../../app/builk-auth';
//import { ConfigurationService } from '../Configuration/Configuration.service';


@Injectable()
export class UploadFileService {
    constructor(
        private http: Http ,//authInterceptorService, 
        //private config : ConfigurationService
    )
    {

    }

    ///////////////////////////////////////////////////////// # File Upload Service
    /////////////////////////////////////////////////////////
    public file64: any;
    private fileForRead: any;
    public openFiles(evt: any) {
        this.fileForRead = evt.target.files[0];
    }

    public doUpload(objUpload: any) {
        //let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        //let options = new RequestOptions({ headers: headers });
        //let objJson: string = JSON.stringify(objUpload);
        //let apiroot = this.config.root + 'saveimage/aws/kwanjai';
        //return this.http.post(apiroot, objJson, options).map(res => res.json());
    }

    exfile: any;
    public imgx: any = {} as any;
    public readFileto64encode(imgFile: Blob  )  {
        let reader = new FileReader();
        reader.onloadend = ((f) => {
            return (e: any) => {
                this.file64 = e.target.result.split(',');
                
                return this.file64[1];
                //console.log('file64', this.file64);
                //let filetype = this.fileForRead.type.split('/')[1];
                //this.upload64ToAWS(this.file64[1] , filetype , 'kwanjai');
            };
        })(imgFile);
        reader.readAsDataURL(imgFile);
    }
    //upload64ToAWS(this.file64[1] , 'jpg','kwanjai');

    //
    private upload64ToAWS(fileEncodeBase64: string, filetype: string, AWSbucketName : string) {
        //this.doUpload({ fileBase64: fileEncodeBase64 , fileExtension: filetype, bucketName: AWSbucketName })
        //    .subscribe((data: any) => {
        //        console.log('file path: ', data);
        //        return data ;
        //    }, (error: any) => {
        //        console.log(error);
        //    });
    }
    /////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////
}
