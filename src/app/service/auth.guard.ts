import { Injectable } from '@angular/core';
import { CanActivate,CanActivateChild,ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild {

private data;
constructor(private dataservice:DataService,private router: Router){
// this.dataservice.currentMessage.subscribe(message => this.data = message);
}
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // console.log(this.data);
    if(this.dataservice.getLogin()){
    	 return true;
    }
    this.router.navigate(['/']);
	return false;
   
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('checking child route access');
    return true;
  }
}
