import { Injectable } from "@angular/core";
import { ActivationEnd, NavigationEnd, Router } from "@angular/router";

@Injectable()
export class FeatureHelpService{

  title = '';
  text = '';
  links = [];

  constructor(router: Router ){
    router.events.subscribe((event)=>{
        if(event instanceof ActivationEnd){
          console.log(router.routerState);
        }
    });
    console.log(router);
  }
}
