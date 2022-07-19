import { UiCommonComponent } from './../ui-common/ui-common.component';
import { Component, Input, Output, EventEmitter, OnInit, Injector } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'apps',
    label:    'Radiogroup',
    tooltip:  'Radiogroup provider interface to select from toggling buttons.'
})
@Component({
    selector: 'control-radio,app-radiogroup',
    inputs:   ['options', 'selected'],
    template: `
      <div>
        <mat-button-toggle-group style="width: 100%;" (change)="onChanged.emit($event.value)" [value]="selected">
          <mat-button-toggle *ngFor="let option of options" [value]="option" style="width: 100%;"> {{ option}} </mat-button-toggle>
        </mat-button-toggle-group>
      </div>
    `,
    styles: [ ],
})
export class ControlRadioComponent {

  @Input()
  options  = [ 'table', 'tree', 'grid' ];

  value: any = 'table';

  @Input()
  selected: any = this.value;

  @Output()
  onChanged = new EventEmitter();

  constructor( injector: Injector ){
    //super( injector );
  }
}
