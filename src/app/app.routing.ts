import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import {AdminLayoutComponent } from './layouts/admin-layout.component';
import { AuthGuard } from './service/auth.guard';
export const AppRoutes: Routes = [
    {
     path: '',
     redirectTo: '/login',
     pathMatch: 'full'
    },
    {
     path: 'login',
    component: LoginComponent 
    },
   {
      path: '',
      component: AdminLayoutComponent,
      canActivate: [AuthGuard],
      children: [
          {
        path: '',
        loadChildren: './agenda/agenda.module#AgendaModule',
          canActivateChild: [AuthGuard],
          },
         {
        path: 'assessment',
        loadChildren: './assessment/assessment.module#AssessmentModule',
        canActivateChild: [AuthGuard],
         },
         {
        path: 'history',
        loadChildren: './history/history.module#HistoryModule',
        canActivateChild: [AuthGuard],
         },
          {
        path: 'scorecard',
        loadChildren: './scorecard/scorecard.module#ScorecardModule',
        canActivateChild: [AuthGuard],
         },
         {
        path: 'library',
        loadChildren: './library/library.module#LibraryModule',
        canActivateChild: [AuthGuard],
         }
   
  ]
    },
   
];
