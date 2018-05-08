import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryMainComponent }  from './historymain.component';
import { HistoryComponent } from './history/history.component';
import { HistoryRoutingModule } from './history.routing';
import { StudentComponent } from './student/student.component';
@NgModule({
  imports: [
    CommonModule,
    HistoryRoutingModule
  ],
  declarations: [HistoryMainComponent,HistoryComponent, StudentComponent]
})
export class HistoryModule { }
