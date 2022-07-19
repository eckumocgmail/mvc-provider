import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserAuthorizeService } from "./user-authorize.service";

@Injectable()
export class SignInValidatedCanActivateService
implements CanActivate
{
  constructor( private authorize: UserAuthorizeService ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authorize.signin.validate();
  }
}
