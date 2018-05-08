import { Routes } from '@angular/router';

import { LibraryComponent } from './library/library.component';

export const LibraryRoutes: Routes = [
    {

      path: 'library',
     component: LibraryComponent
    //   children: [ {
    //     path: 'agenda',
    //     component: AgendaComponent
    // }]
}
];
