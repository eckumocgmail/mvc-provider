import { UiCommonComponent } from './../ui-common/ui-common.component';
import { Component, Input, Injector } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'control-check',
  template: `
    <mat-checkbox #checkbox [checked]="checked">
      <label> {{ label }} </label>
    </mat-checkbox>

  `,
  styles: [
  ]
})
export class ControlCheckComponent  extends UiCommonComponent{

  constructor( injector: Injector ){
    super( injector );
  }


  @Input()
  checked = true;

  @Input()
  label = 'checkbox'


}
