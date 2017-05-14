import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//<<< ------- IMPORT Route PAGE ------- >>>
import { LoginComponent } from '../App/Login/Login.component';
import { TestPageComponent } from '../App/TestPage/TestPage.component';
import { PageNotFoundComponent } from '../App/PageNotFound/PageNotFound.component';


//<<< ------- IMPORT Route PAGE ListManager------- >>>
import { AddNewORGComponent } from '../App/ListManager/AddNewORG/AddNewORG.component';

//<<< ------- IMPORT Route PAGE ListManager------- >>> #POPUP
import { AddNewMemberComponent } from '../App/ListManager/AddNewORG/AddNewMember/AddNewMember.component';
import { AddOldMemberComponent } from '../App/ListManager/AddNewORG/AddOldMember/AddOldMember.component';

 
export const AppRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'testpage', component: TestPageComponent },
    { path: 'pagenotfound', component: PageNotFoundComponent },


    //<<< ------- Route PAGE ListManager------- >>> 
    { path: 'addneworg', component: AddNewORGComponent },
    
    //<<< ------- Route PAGE ListManager------- >>> #POPUP
    { path: '_addnewmember', component: AddNewMemberComponent },
    { path: '_addoldmember', component: AddOldMemberComponent },

    { path: '**', component: PageNotFoundComponent }

];

