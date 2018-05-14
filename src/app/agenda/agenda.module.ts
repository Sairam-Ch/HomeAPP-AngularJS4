import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { AgendaRoutes } from './agenda.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AgendaRoutes),
  ],
  declarations: [AgendaComponent]
})
export class AgendaModule { }
