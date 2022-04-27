import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';



const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'dashboard',
        loadChildren: () => import('./ingreso-app/ingreso-app.module').then(m => m.IngresoAppModule),
        canLoad: [ AuthGuard ]
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
