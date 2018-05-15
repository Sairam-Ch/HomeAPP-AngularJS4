import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
const API_URL = 'http://localhost:3002';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private http: HttpClient,private shareData: DataService) { }

  ngOnInit() {
  }
  // private loginData = {
  //   userID:"jerry.cauley@email.com",
  //   password:"Password1"
  // }
  private userName: string;
  private password: string;
  redirect() {
    const loginData = {};
    this.userName = (<HTMLInputElement>document.getElementById('userName')).value;
    this.password = (<HTMLInputElement>document.getElementById('password')).value;
    // console.log(" this.userName", this.userName)
    loginData['userID'] = this.userName;
    loginData['password'] = this.password;
    console.log("loginData", loginData);

    this.http.post(API_URL + '/login', loginData).subscribe(data => {
      console.log('data', data);
      const loginRes: any = data;

      if (loginRes.status) {
        localStorage.setItem('loginResponse', JSON.stringify(loginRes));
        // console.log("true")
        this.shareData.changeMessage(loginRes.roleStatus);
        if (loginRes.roleStatus === 101) {
          this.shareData.setLogin(true);
          this.router.navigate(['./library']);
        }
        else if(loginRes.roleStatus === 100) {
          this.shareData.setLogin(true);
          this.router.navigate(['./agenda']);
        }
        else {
          this.shareData.setLogin(true);
          this.router.navigate(['./agenda']);
        }
      }
      else {
        alert('Please Enter Valid UserName and Password');
      }

    });

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

