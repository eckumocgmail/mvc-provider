import { UiCommonComponent } from './../ui-common/ui-common.component';
import { Component, Input, Output, EventEmitter, OnInit, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
    selector: 'control-select',
    inputs:   ['options', 'selected'],
    template: `

      <mat-form-field appearance="fill">
        <div>

          <mat-select [value]="selected"
                      (selectionChange)="onChanged.emit($event.value)">
            <mat-option *ngFor="let option of options"  [value]="option">
              {{ option }}
            </mat-option>
          </mat-select>
        </div>
      </mat-form-field>

    `,
    styles: [ ],
})
export class ControlSelectComponent
extends UiCommonComponent{

  @Input()
  multi = false;



  @Input()
  options  = [ 'table', 'tree', 'grid' ];
  value: any = 'table';

  @Input()
  selected: any = this.value;
  control = new FormControl(this.selected);

  @Output()
  onChanged = new EventEmitter();

  doChanges( evt ){
    console.log( evt );
    this.onChanged.emit(this.value = evt);
  }

  constructor( injector: Injector ){
    super( injector );
  }

}
