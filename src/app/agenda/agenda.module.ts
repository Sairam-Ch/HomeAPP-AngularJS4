import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaMainComponent }  from './agendamain.component';
import { RouterModule } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { AgendaRoutes } from './agenda.routing';
import { StudentComponent } from './student/student.component';
import { TakeTestComponent } from './take-test/take-test.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AgendaRoutes),
  ],
  declarations: [AgendaMainComponent,AgendaComponent, StudentComponent, TakeTestComponent]
})
export class AgendaModule { }
