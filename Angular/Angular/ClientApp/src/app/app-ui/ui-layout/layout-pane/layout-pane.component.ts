import { Component, OnInit, Injector, ElementRef } from '@angular/core';
import { UiCommonComponent } from '../../ui-common/ui-common.component';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'layout-pane',
  template: `
    <div style="width: 100%; height: 100%;" class="layout-pane-container">
      <ng-content></ng-content>
    </div>`,
  styles: [
    `.layout-pane-container
      {

        box-shadow: 0px 4px 3px -2px rgba(0, 0, 0, 0.4), 0px 2px 2px 0px rgba(0, 0, 0, 0.24), 0px 2px 6px 0px rgba(0, 0, 0, 0.22);
      }`
  ]
})
export class LayoutPaneComponent
extends UiCommonComponent{

  constructor( injector: Injector ){
    super(injector);
  }

}
