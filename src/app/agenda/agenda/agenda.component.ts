import { Component, OnInit } from '@angular/core';

declare var require: any

declare var $:any;

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	$('.datepicker').datepicker({
    dateFormat: 'dd-mm-yy',
     minDate: new Date( new Date().getFullYear(),  new Date().getMonth(), +1), 
     maxDate: new Date( new Date().getFullYear(),  new Date().getMonth() +1, 0),
    });

    $('.datepicker1').datepicker({
    dateFormat: 'dd-mm-yy',
    minDate: new Date( new Date().getFullYear(),  new Date().getMonth()+1, +1), 
    maxDate: new Date( new Date().getFullYear(),  new Date().getMonth() +2, +0),
    });
  }

}
