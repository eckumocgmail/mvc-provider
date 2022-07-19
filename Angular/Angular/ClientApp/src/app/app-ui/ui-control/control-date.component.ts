import { Component, OnInit, Injector, Input } from '@angular/core';
import { UiCommonComponent } from '../ui-common/ui-common.component';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'control-date',
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Input & change events</mat-label>
      <input matInput [matDatepicker]="picker" (dateChange)="trace($event)">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
  styles: [
  ]
})
export class ControlDateComponent extends UiCommonComponent{

  constructor( injector: Injector ){
    super( injector );
  }

  @Input()
  date = new Date();

  trace( evt ){
    console.log(evt);
  }
}
