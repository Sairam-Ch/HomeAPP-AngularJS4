import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AdminLayoutComponent } from './layouts/admin-layout.component';
import {maincontentComponent } from './maincontent/maincontent.component';
import {HeaderComponent } from './header/header.component';
import { AppRoutes } from './app.routing';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http'; 
import { DataService } from './data.service';
import { AuthGuard } from './service/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    maincontentComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [DataService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
