"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// ***# restart VSO if Cannot find Module
// << ---  Angular2  --->>>
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var angular2_infinite_scroll_1 = require("angular2-infinite-scroll");
var angular_2_local_storage_1 = require("angular-2-local-storage");
// <<< ---  Material 2  --- >>>
require("../node_modules/hammerjs/hammer.js");
var material_1 = require("@angular/material");
// <<< ---  MAIN  --->>>
var app_component_1 = require("./app.component");
var router_1 = require("@angular/router");
var app_routes_1 = require("../App/app.routes");
var TESTauth_1 = require("../App/TESTauth");
// <<< ------- # Pipe # ------- >>>
var _pipe = require("../App/Pipe/Global.pipe");
// <<< ------- Route PAGE ------- >>>
var Login_component_1 = require("../App/Login/Login.component");
var Login_service_1 = require("../App/Login/Login.service");
var TestPage_component_1 = require("../App/TestPage/TestPage.component");
var PageNotFound_component_1 = require("../App/PageNotFound/PageNotFound.component");
// <<< ------- Route PAGE Assistant ------- >>>
var Assistant_component_1 = require("../App/Assistant/Assistant.component");
var Assistant_service_1 = require("../App/Assistant/Assistant.service");
// <<< ------- Route PAGE Management ------- >>>
var Management_component_1 = require("../App/Management/Management.component");
var Management_service_1 = require("../App/Management/Management.service");
var APP_PROVIDERS = [
    Login_service_1.LoginService,
    Assistant_service_1.AssistantService,
    Management_service_1.ManagementService
];
var AUTH_PROVIDERS = {
    provide: TESTauth_1.authInterceptorService,
    useFactory: function (backend, options) {
        return new TESTauth_1.authInterceptorService(backend, options);
    },
    deps: [http_1.XHRBackend, http_1.RequestOptions, angular_2_local_storage_1.LocalStorageService]
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(app_routes_1.AppRoutes, { useHash: true, preloadingStrategy: router_1.PreloadAllModules }),
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            angular2_infinite_scroll_1.InfiniteScrollModule,
            angular_2_local_storage_1.LocalStorageModule.withConfig({ prefix: 'kj-app', storageType: 'localStorage' }),
            //LocalStorageModule.withConfig({ storageType: 'localStorage' }),
            material_1.MaterialModule.forRoot()
        ],
        declarations: [
            app_component_1.AppComponent,
            // <<< ------- # Pipe # ------- >>>
            _pipe.GroupByPipe,
            _pipe.ReversePipe,
            _pipe.ColorStatusOnlinePipe,
            _pipe.CustomerActiveStatusPipe,
            _pipe.AgentActiveStatusPipe,
            // <<< ------- Route PAGE ------- >>>
            Login_component_1.LoginComponent,
            TestPage_component_1.TestPageComponent,
            PageNotFound_component_1.PageNotFoundComponent,
            Assistant_component_1.AssistantComponent,
            Management_component_1.ManagementComponent
        ],
        bootstrap: [
            app_component_1.AppComponent
        ],
        providers: [
            APP_PROVIDERS,
            AUTH_PROVIDERS //
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map