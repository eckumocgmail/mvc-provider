import { Component, Injector, Input, ViewChild } from '@angular/core';
import { UiCommonComponent } from '../../ui-common/ui-common.component';
import { MatSidenav } from '@angular/material/sidenav';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


/**
 * @example
  <layout-line style="height: 100%;">
    <button class="left" style="height: 100%;">
      left
    </button>
    <button style="height: 100%;">
      body
    </button>
    <button class="right" style="height: 100%;">
      right
    </button>
  </layout-line>
 */
@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'layout-line,app-line-pane',
  template: `
    <!-- <mat-sidenav-container style="width: 100%; height: 100%;">
      <mat-sidenav #left mode="side" [opened]="showLeft">
        <ng-content select=".left"></ng-content>
      </mat-sidenav>
      <mat-sidenav-content style="width: 100%; height: 100%;">
        <ng-content select="*:not(.left):not(.right)"></ng-content>
      </mat-sidenav-content>
      <mat-sidenav #right position="end" mode="side" [opened]="showRight" >
        <ng-content select=".right"></ng-content>
      </mat-sidenav>
    </mat-sidenav-container> -->

    <div style="width: 100%; height: 100%; display: -webkit-flex; display: flex; flex-direction: row;" [ngStyle]="css" >
        <div style="height: 100%;" [hidden]="!showLeft">
            <ng-content select=".left"></ng-content>
        </div>
        <div style="width: 100%; height: 100%; display: -webkit-flex; display: flex; flex-direction: column; overflow-y: auto;">
            <ng-content select="*:not(.left):not(.right)"></ng-content>
        </div>
        <div style="height: 100%;" [hidden]="!showRight">
            <ng-content select=".right"></ng-content>
        </div>
    </div>
  `,
  styles: [
  ],
  inputs: [
    'alignItems','justifyItems'
  ]
})
export class LayoutLineComponent
extends UiCommonComponent{

  @Input()
  showLeft = true;

  @Input()
  showRight = true;

  @ViewChild('left',{static: true})
  left: MatSidenav;

  @ViewChild('right',{static: true})
  right: MatSidenav;

  css: { justifyItems: 'flex-end'|'flex-start', alignItems: 'flex-end'|'flex-start'} = {
    alignItems: 'flex-start',
    justifyItems: 'flex-start'
  }

  set alignItems( value ){
    this.css.alignItems = value;
  }

  set justifyItems( value ){
    this.css.justifyItems = value;
  }


  constructor( injector: Injector ) {
    super(injector);
  }



  set rightMode(mode: 'over' | 'push' | 'side'){
    this.right.mode = mode;
  }




}
