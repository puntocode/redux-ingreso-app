import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { dashboardRoutes } from './dashboard/dashboard.routes';


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: dashboardRoutes,
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '' }
];


@NgModule({

    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule {}
