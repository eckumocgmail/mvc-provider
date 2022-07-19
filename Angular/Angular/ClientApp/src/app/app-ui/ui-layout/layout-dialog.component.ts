import { Component, EventEmitter, OnInit } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


/**
 * <layout-dialog>
 *  <mat-toolbar class="top">
 *    Title
 *  </mat-toolbar>
 *  <p> This is sample code </p>
 *  <layout-line>
 *    <button mat-raised-button>ok</button>
 *    <button mat-raised-button>cancel</button>
 *  </layout-line>
 * </layout-dialog>
 */
@specification({
    icon:     'view_headline',
    label:    'layout dialog',
    tooltip:  'Pane for layout content at dialogs.'
})
@Component({
  selector: 'layout-dialog',
  template: `


    <layout-pane style="width: 100%; height: 100%;">
      <ui-layout style="width: 100%; height: 100%;">
        <div class="top" style="width: 100%;">
          <ng-content select=".top"></ng-content>
        </div>
        <div class="left" style="height: 100%;">
          <ng-content select=".left"></ng-content>
        </div>
        <div style="height: 100%;">
          <ng-content select="*:not(.right):not(.left):not(.top):not(.bottom)"></ng-content>
        </div>
        <div class="right" style="height: 100%;">
          <ng-content select=".right"></ng-content>
        </div>
        <div class="bottom" style="width: 100%;">
          <ng-content select=".bottom"></ng-content>
        </div>
      </ui-layout>
    </layout-pane>

  `,
  styles: [
  ]
})
export class LayoutDialogComponent   {

  actions = [];
  clicked = new EventEmitter();

  onClick( action ){
    this.clicked.emit( action );
  }

}
