import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HistoryComponent } from './history/history.component';
import { StudentComponent } from './student/student.component'
import { HistoryMainComponent }  from './historymain.component';
const HistoryRoutes: Routes = [
	{ 
	  path: '',
      component: HistoryMainComponent,
        children: [ {
        path: '',
        component: HistoryComponent
    },{
        path: 'studenthistory',
        component: StudentComponent,
    }]
	}  
];

@NgModule({
  imports: [ RouterModule.forChild(HistoryRoutes) ],
  exports: [ RouterModule ]
})
export class HistoryRoutingModule{ }
