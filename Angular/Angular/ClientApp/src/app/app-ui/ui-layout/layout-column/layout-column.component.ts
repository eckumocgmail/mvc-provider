import { Component, Injector, Input } from '@angular/core';
import { UiCommonComponent } from '../../ui-common/ui-common.component';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


/**
 * @xample root page
<layout-column style="height: 100%;">
  <button class="top" style="width: 100%;">
    top
  </button>
  <layout-line style="width: 100%; height: 100%;">
    <div class="left" style="height: 100%; width:250px; overflow-y: auto;">
      left
      <button style="width: 100%;" *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]">ok</button>
      <button style="width: 100%;" *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]">ok</button>
      <button style="width: 100%;" *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]">ok</button>
    </div>
    <button style="width: 100%; height: 100%;"> center </button>
    <button class="right" style="height: 100%;"> right </button>
  </layout-line>
  <button class="bottom" style="width: 100%;">
    bottom
  </button>
</layout-column>
 */

/**
 * @example
    <layout-column style="height: 100%;">
      <button class="top" style="width: 100%;">
        top
      </button>
      <button style="width: 100%; height: 100%;">
        body
      </button>
      <button class="bottom" style="width: 100%;">
        bottom
      </button>
    </layout-column>
 */
@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'layout-column',
  template: `
  <div style="width: 100%; height: 100%; display: -webkit-flex; display: flex; flex-direction: column;">
    <div style="width: 100%;" *ngIf="showTop">
        <ng-content select=".top"></ng-content>
    </div>
    <div style="width: 100%; height: 100%; overflow-y: auto; display: -webkit-flex; display: flex; flex-direction: column;">
        <ng-content select="*:not(.bottom):not(.top)"></ng-content>
    </div>
    <div style="width: 100%;" *ngIf="showBottom">
        <ng-content select=".bottom"></ng-content>
    </div>
</div>

    <!-- <div style="width: 100%; height: 100%; display: flex; flex-direction: column; flex-wrap: nowrap;">
        <div style="width: 100%; overflow-y: auto;" [hidden]="!showTop">
            <ng-content select=".top"></ng-content>
        </div>
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; flex-wrap: nowrap;">
            <ng-content select="*:not(.bottom):not(.top)"></ng-content>
        </div>
        <div style="width: 100%; overflow-y: auto;" [hidden]="!showBottom">
            <ng-content select=".bottom"></ng-content>
        </div>
    </div> -->
    `,
  styles: [
  ]
})
export class LayoutColumnComponent
extends UiCommonComponent{

  @Input()
  showTop = true;

  @Input()
  showBottom = true;

  constructor( injector: Injector ) {
    super( injector );
  }

}
