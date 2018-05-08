import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { ScorecardRoutes} from './scorecard.routing';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ScorecardRoutes),
  ],
  declarations: [ScorecardComponent]
})
export class ScorecardModule { }
