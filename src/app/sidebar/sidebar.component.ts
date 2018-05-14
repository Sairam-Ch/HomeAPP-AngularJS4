import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
   data: any;
  constructor(private sharService: DataService) {
  }
  private SidebarList = [];
  ngOnInit() {
  	// this.sharService.currentMessage.subscribe(message => this.data = message)
    // if(this.data == 101){
    // 	this.SidebarList = [{ path: '/library', title: 'Library',img:'assets/img/library_icon.png'}];
    //  }
    // else if(this.data ==100){
    // 	this.SidebarList = [{ path: '/agenda', title: 'Agenda',img:'assets/img/agenda.png'},
    //                         { path: '/assessment', title: 'Assessment',img:'assets/img/assessment_icon.png'},
    //                         { path: '/history', title: 'History',img:'assets/img/history.png'},
    //                         { path: '/scorecard', title: 'Scorecard',img:'assets/img/target.png'}];
    //     }
    this.SidebarList = [{ path: '/agenda', title: 'Agenda',img:'assets/img/agenda.png'},
      { path: '/assessment', title: 'Assessment',img:'assets/img/assessment_icon.png'},
      { path: '/history', title: 'History',img:'assets/img/history.png'},
      { path: '/scorecard', title: 'Scorecard',img:'assets/img/target.png'}];
  }

}
