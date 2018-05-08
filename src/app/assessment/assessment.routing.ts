import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssessmentComponent } from './assessment/assessment.component';


const AssessmentRoutes: Routes = [
	{ 
	  path: '',
      component: AssessmentComponent,
	 //  children: [ 
	 //    {
		//     path: '',
		//     component: PersonListComponent,
		//     children: [
		//        {
		// 	       path: ':id',
		//            component: PersonEditComponent
		// 	   }
		//     ]			
		// }
	 //  ]
	}  
];

@NgModule({
  imports: [ RouterModule.forChild(AssessmentRoutes) ],
  exports: [ RouterModule ]
})
export class AssessmentRoutingModule{ }
