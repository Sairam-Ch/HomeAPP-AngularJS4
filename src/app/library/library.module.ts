import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library/library.component';
import { LibraryRoutes } from './library.routing';
import { RouterModule } from '@angular/router';
@NgModule({ 
  imports: [
    CommonModule,
     RouterModule.forChild(LibraryRoutes),
  ],
  declarations: [LibraryComponent]
})
export class LibraryModule { }
