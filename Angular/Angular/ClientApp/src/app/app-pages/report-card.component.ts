import { ActivatedRouteSnapshot } from '@angular/router';
import { Component } from "@angular/core";

@Component({
  selector: 'report-card',
  template: `report`
})
export class ReportCardComponent
{
  constructor( private activeRoute: ActivatedRouteSnapshot ){
    console.log( activeRoute );
  }
}
