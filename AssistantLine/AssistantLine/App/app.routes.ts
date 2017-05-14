import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//<<< ------- IMPORT Route PAGE ------- >>>
import { LoginComponent } from '../App/Login/Login.component';
import { TestPageComponent } from '../App/TestPage/TestPage.component';
import { PageNotFoundComponent } from '../App/PageNotFound/PageNotFound.component';

 
export const AppRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'testpage', component: TestPageComponent },
    { path: 'pagenotfound', component: PageNotFoundComponent },


    //<<< ------- Route Management------- >>>
    

    { path: '**', component: PageNotFoundComponent }

];

