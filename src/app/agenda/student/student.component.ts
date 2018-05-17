import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  neotakes(){
  this.router.navigate(['./agenda/take_test']);  
  }
  goBack(){
  this.router.navigate(['./agenda']);
  }
}
