import { Routes } from '@angular/router';
import {loginGuard } from './core/guards/login-guard';
import { rolesGuard } from './core/guards/roles-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',loadComponent:()=>import('./pages/login/login').then(m=>m.Login),canActivate:[authGuard]},
    {path:'admin',loadComponent:()=>import('./pages/layout/layout').then(m=>m.Layout),canActivate:[loginGuard],children:[
        {path:'dashboard',loadComponent:()=>import('./pages/dashboard/dashboard').then(m=>m.Dashboard),canActivate:[rolesGuard],data:{roles:['IncidentAdmin']}},
        {path:'users',loadComponent:()=>import('./pages/users/users').then(m=>m.Users),canActivate:[rolesGuard],data:{roles:['IncidentAdmin']}},
        {path:'incidents-list',loadComponent:()=>import('./pages/incident/incident-list/incident-list').then(m=>m.IncidentList),canActivate:[rolesGuard],data:{roles:['IncidentAdmin','User','Support Staff']}},
        {path:'incident-form',loadComponent:()=>import('./pages/incident/incident-form/incident-form').then(m=>m.IncidentForm),canActivate:[rolesGuard],data:{roles:['IncidentAdmin','User']}},
        {path:'NotFound',loadComponent:()=>import('./pages/not-found/not-found').then(m=>m.NotFound)}
    ]},
    {path:'**',loadComponent:()=>import('./pages/not-found/not-found').then(m=>m.NotFound)}
];
