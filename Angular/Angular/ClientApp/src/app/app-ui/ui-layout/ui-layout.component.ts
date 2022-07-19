import { LayoutLineComponent } from './layout-line/layout-line.component';
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { UiCommonComponent } from '../ui-common/ui-common.component';
import { LayoutColumnComponent } from './layout-column/layout-column.component';

/**
 * @example
    <ui-layout>
      <button class="top" style="width: 100%;">top</button>
      <button class="left" style="height: 100%;">left</button>
      <button class="right" style="height: 100%;">right</button>
      <button class="bottom"  style="width: 100%;">bottom</button>
      <button  style="width: 100%; height: 100%;">left</button>
    </ui-layout>
 */
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'ui-layout',
  template: `
    <layout-pane class="ui-layout-container" style="height: 100%;">
      <layout-column style="height: 100%;" #column>
        <div class="top" style="width: 100%;">
          <ng-content select=".top"></ng-content>
        </div>
        <layout-line style="height: 100%;" #line>
          <div class="left" style="height: 100%;">
            <ng-content select=".left"></ng-content>
          </div>
          <div style="height: 100%;">
            <ng-content select="*:not(.right):not(.left):not(.top):not(.bottom)"></ng-content>
          </div>
          <div class="right" style="height: 100%;">
            <ng-content select=".right"></ng-content>
          </div>
        </layout-line>
        <div class="bottom" style="width: 100%;">
          <ng-content select=".bottom"></ng-content>
        </div>
      </layout-column>
    </layout-pane>
  `,
  styles: [
    `
      .ui-layout-container
      {
        border-radius: 5px;
        box-shadow: 0px 4px 3px -2px rgba(0, 0, 0, 0.4), 0px 2px 2px 0px rgba(0, 0, 0, 0.24), 0px 2px 6px 0px rgba(0, 0, 0, 0.22);
      }
    `
  ]
})
export class UiLayoutComponent
extends UiCommonComponent{

  @ViewChild('column',{static: true}) column: LayoutColumnComponent;
  @ViewChild('line',{static: true}) line: LayoutLineComponent;

  constructor( injector: Injector ) {
    super(injector);
  }

  get left(){
    return this.line.left;
  }

  get right(){
    return this.line.right;
  }

}
