import { UserAuthorizeService } from './pages-auth/user-authorize.service';
import { AppStartupService } from './../app-startup.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterEvent, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { specification } from 'src/app/app-ui/ui-forms/input-form/annotations/specification.function';

@specification({
  icon:   'home',
  label:  'Меню'
})
@Component({
  selector: 'index',
  template: `
      <router-outlet >
      </router-outlet>
  `
})
export class AppIndexComponent{

  constructor( public app: AppService,
    public auth: UserAuthorizeService,
                public startup: AppStartupService,
                private route: ActivatedRoute,
                 private router: Router ){
    // this.route.params.subscribe(this.handleParamsEvents());
    // this.route.queryParams.subscribe(this.handleQueryParamsEvents());
    // this.route.fragment.subscribe(this.handleFragmentEvents());
    // this.route.data.subscribe(this.handleDataEvents());
    // this.route.url.subscribe(this.handleUrlEvents());
    // this.router.events.subscribe(this.handleRouterEvents());
  }

  logout(){
    const ctrl = this;
    this.auth.signin.signout( ).subscribe((message:any)=>{
      console.log(message);
      ctrl.auth.onSigninFailed();
    });

  }

  handleParamsEvents(){
    const ctrl = this;
    return ( params )=>{
      ctrl.onParamsChanged( params );
    }
  }

  onParamsChanged(params: any) {
    console.log(this.constructor.name,params);
  }

  handleDataEvents() {
    const ctrl = this;
    return function( data: import("@angular/router").Data){
      Object.assign(ctrl,data);
    }
  }

  handleFragmentEvents() {
    const ctrl = this;
    return function( event: string ){
      ctrl.onMessage( event );
    }
  }

  onMessage(event: string) {
    console.log(this.constructor.name,event);
  }

  handleRouterEvents()  {
    const ctrl = this;
    return function( event: RouterEvent ){
      ctrl.onRouterEvent( event );
    }
  }

  onRouterEvent(event: RouterEvent) {
    console.log( 'onRouterEvent',event );
  }

  handleUrlEvents(){
    const ctrl = this;
    return function( segments: import("@angular/router").UrlSegment[] ){

      return function( segments: import("@angular/router").UrlSegment[]  ){
        ctrl.onUrlEvent( segments );
      }
    }
  }

  onUrlEvent(queryParams: UrlSegment[]) {
    console.log( 'onUrlEvent',queryParams );
  }

  handleQueryParamsEvents()  {
    const ctrl = this;
    return function( queryParams: import("@angular/router").Params  ){
      ctrl.onQueryParamsEvent( queryParams );
    }
  }

  onQueryParamsEvent(queryParams: Params) {
    console.log( 'onQueryParamsEvent',queryParams );
  }

}
