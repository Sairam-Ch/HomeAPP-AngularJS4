import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  private isLogin:boolean = false;
  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
      console.log(message);
    this.messageSource.next(message)
  }
  
  setLogin(login){
  	this.isLogin = login;
  	localStorage.setItem('login', JSON.stringify(this.isLogin));
  }
  getLogin():boolean{
  	return this.isLogin = JSON.parse(localStorage.getItem('login')) ;
  }

}