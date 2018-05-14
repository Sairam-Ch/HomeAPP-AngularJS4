import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { ScorecardRoutes} from './scorecard.routing';
import { UICarouselModule } from "ui-carousel";
import { ObjectValuesPipe } from './object-values.pipe';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ScorecardRoutes),
    UICarouselModule
  ],
  declarations: [ScorecardComponent, ObjectValuesPipe]
})
export class ScorecardModule { }
