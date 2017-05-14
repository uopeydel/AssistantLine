// ***# restart VSO if Cannot find Module
// << ---  Angular2  --->>>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, RequestOptions, XHRBackend  } from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { LocalStorageModule ,LocalStorageService } from 'angular-2-local-storage';
import { CookieService } from 'angular2-cookie/services/cookies.service';


// <<< ---  Material 2  --- >>>
import '../node_modules/hammerjs/hammer.js';
import { MaterialModule } from '@angular/material';

// <<< ---  MAIN  --->>>
import { AppComponent } from './app.component';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AppRoutes } from '../App/app.routes';

import { authInterceptorService} from '../App/TESTauth';

// <<< ------- # Pipe # ------- >>>
import * as _pipe from '../App/Pipe/Global.pipe';

// <<< ------- Route PAGE ------- >>>
import { LoginComponent } from '../App/Login/Login.component';
import { TestPageComponent } from '../App/TestPage/TestPage.component';
import { PageNotFoundComponent } from '../App/PageNotFound/PageNotFound.component';


const APP_PROVIDERS = [
    AddNewORGService
];

const AUTH_PROVIDERS = {
    provide: authInterceptorService,
    useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new authInterceptorService(backend, options);
    },
    deps: [XHRBackend, RequestOptions, LocalStorageService]
};

@NgModule({
    imports: [
        RouterModule.forRoot(AppRoutes, { useHash: true, preloadingStrategy: PreloadAllModules }),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        JsonpModule,
        InfiniteScrollModule,
        LocalStorageModule.withConfig({ prefix: 'kj-app',  storageType: 'localStorage' }),
        //LocalStorageModule.withConfig({ storageType: 'localStorage' }),
        MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        // <<< ------- # Pipe # ------- >>>
        _pipe.GroupByPipe,
        _pipe.ReversePipe,

        // <<< ------- Route PAGE ------- >>>
        LoginComponent,
        TestPageComponent,
        PageNotFoundComponent,
       
    ],
    bootstrap: [
        AppComponent 
    ],
    providers: [  
        APP_PROVIDERS, // expose our Services and Providers into Angular's dependency injection 
        AUTH_PROVIDERS //
    ]
})
export class AppModule { }



