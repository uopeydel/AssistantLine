"use strict";
//<<< ------- IMPORT Route PAGE ------- >>>
var Login_component_1 = require("../App/Login/Login.component");
var TestPage_component_1 = require("../App/TestPage/TestPage.component");
var PageNotFound_component_1 = require("../App/PageNotFound/PageNotFound.component");
//<<< ------- IMPORT Route PAGE ListManager------- >>>
var AddNewORG_component_1 = require("../App/ListManager/AddNewORG/AddNewORG.component");
//<<< ------- IMPORT Route PAGE ListManager------- >>> #POPUP
var AddNewMember_component_1 = require("../App/ListManager/AddNewORG/AddNewMember/AddNewMember.component");
var AddOldMember_component_1 = require("../App/ListManager/AddNewORG/AddOldMember/AddOldMember.component");
exports.AppRoutes = [
    { path: '', component: Login_component_1.LoginComponent },
    { path: 'login', component: Login_component_1.LoginComponent },
    { path: 'testpage', component: TestPage_component_1.TestPageComponent },
    { path: 'pagenotfound', component: PageNotFound_component_1.PageNotFoundComponent },
    //<<< ------- Route PAGE ListManager------- >>> 
    { path: 'addneworg', component: AddNewORG_component_1.AddNewORGComponent },
    //<<< ------- Route PAGE ListManager------- >>> #POPUP
    { path: '_addnewmember', component: AddNewMember_component_1.AddNewMemberComponent },
    { path: '_addoldmember', component: AddOldMember_component_1.AddOldMemberComponent },
    { path: '**', component: PageNotFound_component_1.PageNotFoundComponent }
];
//# sourceMappingURL=app.routes.js.map