
import { OnChanges } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { Input} from '@angular/core';
import { Output} from '@angular/core';
import { Component} from '@angular/core';
import { EventEmitter} from '@angular/core';

import { SelectionModel } from '../../ui-control/control-api/selection-model';
import { InputYear } from '../../ui-forms/input-form/annotations/asp-types.const';


export class ListItem
{
  constructor(
    public label: string,
    public icon?: string ){}
}


const listComponentDefinition = {
  selector:     'list,collection-list',
  styleUrls: [ './ui-list.component.css' ],
  templateUrl:  './ui-list.component.html',
  inputs: [ 'multiselect',
            'template',
            'title',
            'listitems',
            'checkable', 'selectable', 'draggable', 'droppable', 'search' ]
};


const listComponentSpecification = {
  icon:     'view_headline',
  label:    'List component',
  tooltip:  'List component layout create views for items defined into input property listitems. ' +
            'If defined input property template than this template will be used to create view for each item. ' +
            'Can layout items verticaly in column or horizontal in line. '
};


@Component({
  selector: 'collection-list,app-list',
  template: `

    <h4> {{ title }} </h4>
    <div style="padding: 10px; display: flex; flex-direction: column;">
      <div *ngFor="let ctrl of listitems"
            style="padding: 10px;"
            (click)="select(ctrl, $event )"
            [ngClass]="{ 'selected': ctrl['selected'], 'focused': ctrl['focused'] }"
            [hidden]="ctrl['hidden']">

          <ng-container *ngTemplateOutlet="template||defaults; context: { ctrl: ctrl, ctx: this }"
                        style="display: inline-block;">
          </ng-container>


      </div>
    </div>
    <ng-template #defaults let-ctrl="ctrl" let-ctx="ctx">
      <mat-checkbox *ngIf="checkable" (change)="onCheck.emit(ctrl)"> {{ ctrl.label||ctrl.name||ctrl.text }}</mat-checkbox>
      <label *ngIf="!checkable"> {{ ctrl.label||ctrl.name||ctrl.text }}</label>
    </ng-template>
  `,
  styles: [
    `
      .selected{
        color: #fff;
        background-color: #1b6ec2;
        border-color: #1861ac;
      }
      .focused{
        color: #fff;
        background-color: #1b6ec2;
        border-color: #1861ac;
      }
    `
  ],
  inputs: [ 'multiselect',
            'template',
            'title', 'listitems',
            'start',  'search' ]
})
export class CollectionListComponent
{
  @Input()
  title = 'Навигация';

  @Input()
  template: TemplateRef<any>;
  listitems: ListItem[] = [];

  @Input() public hiddenable:    boolean = true;
  @Input() public expandable:    boolean = true;
  @Input() public enablable:     boolean = true;
  @Input() public searchable:    boolean = true;
  @Input() public sortable:      boolean = true;
  @Input() public selected:      boolean = false;
  @Input() public checkable:      boolean = true;

  @Input() public selectable:    boolean = false;
  @Input() public editable:      boolean = false;
  @Input() public focusable:     boolean = false;
  @Input() public draggable:     boolean = true;
  @Input() public droppable:     boolean = true;

  @Output('selected') onSelect = new EventEmitter();
  @Output('checked') onCheck = new EventEmitter();

  selection: SelectionModel = new SelectionModel(  );

  //операция выбора элемента
  public select( p ){
    if( this.selectable ){
        this.selection.toggle( p );
        this.onSelect.emit( p );
    }
  }

  //операция переноса элемента
  drag( p ){
    if( this.draggable ){
        this.selection.toggle( p );
        p.selected = p.selected? false: true;
    }
  }

  //операция добавления переносимого элемента
  drop( p ){
    if( this.droppable ){
        this.selection.toggle( p );
        p.selected = p.selected? false: true;
    }
  }

  @Input()
  set multiselect( value ){
      this.selection.multi = value;
  }

  @Output() dragged = new EventEmitter();
  @Output() dropped = new EventEmitter();

  @Output() init = new EventEmitter();
  @Output() destroy = new EventEmitter();
  @Output() changes = new EventEmitter();
  @Output() check = new EventEmitter();
}
