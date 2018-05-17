import { Component, OnInit , Input, Output , EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
// declare interface RouteInfo {
//     path: string;
//     title: string;
// }
// export const ROUTES: RouteInfo[] = [
//   { path: 'agenda', title: 'Agenda'},
//   { path: 'assessment', title: 'Assessment'},
//   { path: 'history', title: 'History'},
//   { path: 'history/studenthistory', title: 'Student History'},
//   { path: 'scorecard', title: 'Scorecard'},
//   { path: 'library', title: 'Library'}
// ];
@Component({
  selector: 'header-cmp',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private listTitles: any[];
    location: Location;
 
   constructor(location: Location,private router: Router) {
     this.location = location;
  }
 
  @Input()
  HeaderTitle:string;

  ngOnInit() {
  // this.listTitles = ROUTES.filter(listTitle => listTitle);
  this.sendMsg();
  }

    // getTitle(){
    //   var titlee = this.location.prepareExternalUrl(this.location.path());

    //   if(titlee.charAt(0) === '#'){
    //       titlee = titlee.slice( 2 );
    //   }
    //   titlee = titlee.substring(titlee.indexOf('/')+1);

    //   // console.log(titlee);
    //   for(var item = 0; item < this.listTitles.length; item++){
    //       if(this.listTitles[item].path === titlee){
    //           return this.listTitles[item].title;
    //       }
    //   }
    //   return 'Agenda';
    // }
    Logout(){
      localStorage.setItem('login', 'false');
      this.router.navigate(['./']);
    }

    @Output()
    sendMsgEvent = new EventEmitter<string>();
    private msg;
    sendMsg() {
      this.msg = {
        Firstname:"Manoranjan",
        LastName:"Nayak"
      }
        this.sendMsgEvent.emit(this.msg);
        }
        userData;
        userName(){
          this.userData = JSON.parse(localStorage.getItem('loginResponse'));
          return this.userData.data[0].firstname + ' ' + this.userData.data[0].lastname;
        }
}
