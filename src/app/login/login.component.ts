import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
const API_URL = 'http://localhost:8601';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private http: HttpClient,private shareData: DataService) { }

  ngOnInit() {
  }
  private loginData = {
    userID:"jerry.cauley@email.com",
    password:"Password1"
  }
  redirect() {
     this.shareData.setLogin(true);
     this.router.navigate(['./agenda']);
    // this.http.post(API_URL+'/login', this.loginData).subscribe(data => {
    //     var response;
    //     response = data;
    //     localStorage.setItem('loginResponse', JSON.stringify(response));
    //     console.log(response);
    //     if (response.status) {
    //       this.shareData.changeMessage(response.roleStatus);
    //                if(response.roleStatus == 101){
    //                    this.shareData.setLogin(true);
    //                    this.router.navigate(['./library']);
    //                  }else{
    //                     this.shareData.setLogin(true);
    //                     this.router.navigate(['./agenda']);
    //                     }
    //         } else {
    //             console.log('error');
    //             }
    //    },
    //   err => {
    //     console.log(err);
    //   });
   
  }
}

