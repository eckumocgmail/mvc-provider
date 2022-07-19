import { UiCommonComponent } from 'src/app/app-ui/ui-common/ui-common.component';
import { Component, Input, Injector } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


/**
 * <layout-columns [columnCount]="3">
 * </layout-columns>
 */
@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'layout-columns',
  template: `
    <div style="column-count: 2; column-width: auto; padding: 8px; padding-bottom: 0px;" align="center" >
      <ng-content></ng-content>
    </div>`,
  styles: [
  ]
})
export class LayoutColumnsComponent
extends UiCommonComponent
{

  @Input()
  columnCount = 2;

  constructor( injector: Injector  ){
    super( injector );
  }

}
