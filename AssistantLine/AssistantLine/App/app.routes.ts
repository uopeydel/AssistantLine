import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//<<< ------- IMPORT Route PAGE ------- >>>
import { LoginComponent } from '../App/Login/Login.component';
import { TestPageComponent } from '../App/TestPage/TestPage.component';
import { PageNotFoundComponent } from '../App/PageNotFound/PageNotFound.component';


import { AssistantComponent } from '../App/Assistant/Assistant.component';
import { ManagementComponent } from '../App/Management/Management.component';

 
export const AppRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'testpage', component: TestPageComponent },
    { path: 'pagenotfound', component: PageNotFoundComponent },


    //<<< ------- Route Management------- >>>
    { path: 'Management', component: ManagementComponent },

    //<<< ------- Route Assistant------- >>>
    { path: 'Assistant', component: AssistantComponent },


    { path: '**', component: PageNotFoundComponent }

];

