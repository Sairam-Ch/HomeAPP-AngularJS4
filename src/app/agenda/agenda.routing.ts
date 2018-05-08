import { Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';

export const AgendaRoutes: Routes = [
    {

      path: 'agenda',
     component: AgendaComponent,
    //   children: [ {
    //     path: 'agenda',
    //     component: AgendaComponent
    // }]
}
];
