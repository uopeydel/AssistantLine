"use strict";
//<<< ------- IMPORT Route PAGE ------- >>>
var Login_component_1 = require("../App/Login/Login.component");
var TestPage_component_1 = require("../App/TestPage/TestPage.component");
var PageNotFound_component_1 = require("../App/PageNotFound/PageNotFound.component");
var Assistant_component_1 = require("../App/Assistant/Assistant.component");
var Management_component_1 = require("../App/Management/Management.component");
exports.AppRoutes = [
    { path: '', component: Login_component_1.LoginComponent },
    { path: 'login', component: Login_component_1.LoginComponent },
    { path: 'testpage', component: TestPage_component_1.TestPageComponent },
    { path: 'pagenotfound', component: PageNotFound_component_1.PageNotFoundComponent },
    //<<< ------- Route Management------- >>>
    { path: 'Management', component: Management_component_1.ManagementComponent },
    //<<< ------- Route Assistant------- >>>
    { path: 'Assistant', component: Assistant_component_1.AssistantComponent },
    { path: '**', component: PageNotFound_component_1.PageNotFoundComponent }
];
//# sourceMappingURL=app.routes.js.map