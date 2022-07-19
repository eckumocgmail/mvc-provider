import { AppStartupService } from './../../app-startup.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';



import { UserSigninService } from './user-signin.service';




@Injectable({
  providedIn: 'root'
})
export class UserAuthorizeService{

  _profile: any;
  public _signed = false;


  constructor(
    private startup: AppStartupService,
    public signin: UserSigninService,
    private router: Router){

    this.signin.validate().subscribe(this.callbackValidate());
  }

  onSigninSuccess(){
    this._signed = true;

    this.router.navigate([this.startup.href]);
  }

  onSigninFailed(){
    this._signed = false;
    this.router.navigate(['/index/login']);
  }

  onSignoutSuccess(){
    this._signed = false;
    this._profile = null;

    this.router.navigate(['login']);
  }


  callbackValidate(){
    const ctrl = this;
    return function(state: any){
      if( state == true ){
        ctrl.onSigninSuccess();
      }else{
        ctrl.onSigninFailed()
      }
    }
  }

}

