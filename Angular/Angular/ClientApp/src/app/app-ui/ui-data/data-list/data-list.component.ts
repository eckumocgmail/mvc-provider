import { SelectionModel } from './../../ui-control/control-api/selection-model';
import { EventEmitter, Input, TemplateRef } from '@angular/core';
import { FormFieldComponent } from './../../ui-forms/form-input/form-field.component';
import { specification } from 'src/app/app-ui/ui-common/specification.function';
import { AfterViewInit, Component, OnInit, ViewChild, SimpleChanges, Output } from '@angular/core';

@specification({
  icon:   'border_all',
  label:  'Table component',
  tooltip:  'Table component implements table view and provide operations select, focus, drag and drop. '
  + 'Can request data from restfull web services connected with database by ODBCs or OLEs drivers. '
  + 'Feature side of table component that is an some analitics functions.'
})
@Component({
  selector: 'data-list',
  template: `
    <div class="my-3 p-3 bg-white rounded box-shadow">
        <h6 class="border-bottom border-gray pb-2 mb-0"> {{title}} </h6>

        <div *ngFor="let listitem of dataset"
             (click)="select(listitem, $event )"
             [ngClass]="{ 'selected': listitem['selected'], 'focused': listitem['focused'] }"
             [hidden]="listitem['hidden']">
          <ng-container *ngTemplateOutlet="template||defaults; context: { ctrl: listitem, ctx: this }"
                          style="display: inline-block;">
          </ng-container>
        </div>


        <ng-template #defaults let-ctrl="ctrl" let-ctx="ctx">
          <div class="media text-muted pt-3">
              <img data-src="/assets/star.svg" alt="" class="mr-2 rounded">
              <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  <div class="d-flex justify-content-between align-items-center w-100">
                      <strong class="text-gray-dark"> {{ctrl.title}} </strong>
                      <a href="@Model.Href">{{ctrl.href}}</a>
                  </div>
                  <div><span class="d-block">{{ctrl.selected}}</span></div>
              </div>
          </div>
        </ng-template>

    </div>
  `,

  inputs: ['attributes','dataset']
})
export class DataListComponent
{

  @Input()
  title = 'Навигация';

  @Input()
  template: TemplateRef<any>;
  attributes: FormFieldComponent[];
  dataset: any[] = [
    {title: '1', href: '2', selected: false}
  ];

  //selection
  selection: SelectionModel = new SelectionModel(  );

  @Input() public hiddenable:    boolean = true;
  @Input() public expandable:    boolean = true;
  @Input() public enablable:     boolean = true;
  @Input() public searchable:    boolean = true;
  @Input() public sortable:      boolean = true;
  @Input() public selected:      boolean = true;
  @Input() public checkable:     boolean = true;
  @Input() public selectable:    boolean = true;
  @Input() public editable:      boolean = true;
  @Input() public focusable:     boolean = true;
  @Input() public draggable:     boolean = true;
  @Input() public droppable:     boolean = true;


  public isSearchable(){  return this.searchable;     };
  public isSortable(){    return this.sortable;     };
  public isSelectable(){  return this.selectable;     };
  public isFocusable(){   return this.focusable;      };
  public isEditable(){    return this.editable;    };
  public isDraggable(){   return this.draggable;      };
  public isDroppable(){   return this.droppable;      };

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

  keypress($event){}
  dragStart( $event,griditem ){}
  dragOver( $event ){}
  dragLeave( $event ){}

  @Output('selected') onSelect = new EventEmitter();
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

  get activeAttributes(){
    return this.attributes.filter(a=>a.type!='hidden');
  }
}
