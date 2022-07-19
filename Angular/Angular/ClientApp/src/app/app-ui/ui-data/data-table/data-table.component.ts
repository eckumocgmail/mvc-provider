import { SelectionModel } from './../../ui-control/control-api/selection-model';
import { EventEmitter, Input, OnChanges } from '@angular/core';
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
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  inputs: ['attributes','dataset']
})
export class DataTableComponent
implements OnChanges{

  @Input()
  title = 'DataTable';
  ngOnChanges(changes: SimpleChanges): void {
    if( changes.dataset ){
      const multi = this.selection.multi;
      this.selection = new SelectionModel(  );
      this.selection.multi = multi;
      this.columns = this.getActiveAttributes();
    }
    if( changes.attributes){
      this.columns = this.getActiveAttributes();
    }
  }

  columns: FormFieldComponent[];

  @Input()
  attributes: FormFieldComponent[];
  dataset: any[];

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

  getActiveAttributes(){

    const result = this.attributes
      .filter(a=>!(a.isControl && a['control']['type']=='textarea'))
      .filter(a=>!(a.mapped==false))
      .filter(a=>a.type!='hidden');
    console.log(result);
    return result;
  }
}
