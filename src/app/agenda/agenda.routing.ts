import { Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { AgendaMainComponent }  from './agendamain.component';
import { StudentComponent } from './student/student.component';
import { TakeTestComponent } from './take-test/take-test.component';
export const AgendaRoutes: Routes = [
    {

      path: 'agenda',
     component: AgendaMainComponent,
      children: [ {
            path: '',
            component: AgendaComponent
           },
           {
            path: 'student',
            component: StudentComponent
           },
           {
            path: 'take_test',
            component: TakeTestComponent
           }
          ]
}
];
