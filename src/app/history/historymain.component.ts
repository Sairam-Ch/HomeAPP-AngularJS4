import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
 template: `<router-outlet></router-outlet>`
})
export class HistoryMainComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {
  	console.log(this.router.url);
  }
  
}
