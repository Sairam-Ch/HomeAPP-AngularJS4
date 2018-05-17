import {Component, OnInit, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../data.service';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';

const API_URL = 'http://localhost:3002';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private shareData: DataService, private zone: NgZone) {
    if(shareData.getLogin){
     this.router.navigate(['./agenda']);
    }
  }

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      userID: new FormControl('', [
        Validators.required,
        // Validators.pattern("[^ @]*@[^ @]*")
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.minLength(8)
      ]),
    });
  }


  // Model Driven Form Validation
  private message: string;
  private ifNoInput: boolean;
  private Login_message: string;


  LoginFormSubmit() {
    this.ifNoInput = false;
    // if(this.loginForm.valid){
    console.log(this.loginForm.value);
    this.http.post(API_URL + '/login', this.loginForm.value).subscribe(data => {
      console.log('data', data);
      const loginRes: any = data;

      if (loginRes.status) {
        localStorage.setItem('loginResponse', JSON.stringify(loginRes));
        this.shareData.changeMessage(loginRes.roleStatus);
        this.Login_message = 'Logging In'
        if (loginRes.roleStatus === 101) {
          this.shareData.setLogin(true);
          this.router.navigate(['./library']);
        }
        else if (loginRes.roleStatus === 100) {
          this.shareData.setLogin(true);
          this.router.navigate(['./agenda']);
        }
        else {
          this.shareData.setLogin(true);
          this.router.navigate(['./agenda']);
        }
      }
      else {
        // alert();
        this.message = 'Please Enter Valid UserName and Password';
        this.ifNoInput = true;
      }
    });
    // }


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

