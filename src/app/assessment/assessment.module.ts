import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AssessmentComponent } from './assessment/assessment.component';
import { AssessmentRoutingModule } from './assessment.routing';
// import { AssdetailsComponent } from './assessment/assdetails.component';
// import { FiltersectionComponent } from './assessment/filtersection.component';
// import { QuestionsectionComponent } from './assessment/questionsection.component';
// import { AsscommonService } from './service/asscommonservice.service';
@NgModule({
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    FormsModule
  ],
  // declarations: [AssessmentComponent, AssdetailsComponent, FiltersectionComponent, QuestionsectionComponent],
  declarations: [AssessmentComponent],
  // providers: [AsscommonService]
  providers: []
})
export class AssessmentModule { }
