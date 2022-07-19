import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStartupService implements CanActivate, CanActivateChild{

  hrefDefaults: string = '/index/developer';
  href: string = this.hrefDefaults;
  started = false;

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | import("rxjs").Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if( this.started === false){
      if(
        location.href.substr(location.origin.length).startsWith('/index/login')==false &&
        location.href.substr(location.origin.length).startsWith('/index/logout')==false &&
        location.href.substr(location.origin.length).startsWith('/index/registration')==false){
          this.href = location.href.substr(location.origin.length);
      }
      console.log('AppStartupService', this.href );
      this.started = true;
    }

    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | import("rxjs").Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if( this.started === false){
      if(
        location.href.substr(location.origin.length).startsWith('/index/login')==false &&
        location.href.substr(location.origin.length).startsWith('/index/logout')==false &&
        location.href.substr(location.origin.length).startsWith('/index/registration')==false){
          this.href = location.href.substr(location.origin.length);
      }

      console.log('AppStartupService', this.href );
      this.started = true;
    }
    return true;
  }

}
