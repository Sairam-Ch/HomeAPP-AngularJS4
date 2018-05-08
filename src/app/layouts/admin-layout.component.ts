import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
export const ROUTES = [
  { path: 'agenda', title: 'Agenda'},
  { path: 'assessment', title: 'Assessment'},
  { path: 'history', title: 'History'},
  { path: 'history/studenthistory', title: 'Student History'},
  { path: 'scorecard', title: 'Scorecard'},
  { path: 'library', title: 'Library'}
];
@Component({
  selector: 'adminlayout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private shareData: DataService,private location: Location) { }
  private status;
  // private Route: Array<string>
  ngOnInit() {
  	if(localStorage.getItem('loginResponse')){
  		this.status = JSON.parse(localStorage.getItem('loginResponse'));
      this.shareData.changeMessage(this.status.roleStatus);
  	}
  }
  headerTitle():string {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      titlee = titlee.substring(titlee.indexOf('/')+1);

      for(var item = 0; item < ROUTES.length; item++){
          if(ROUTES[item].path === titlee){
              return ROUTES[item].title;
          }
      }
   return 'Agenda';
  }

  printMsg(msg) {
      console.log(msg);
        }
  
}
