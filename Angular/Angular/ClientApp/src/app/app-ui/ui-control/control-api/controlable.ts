
import { Output, Injector, Component } from '@angular/core';
import { ControlableApi } from './controlable.api';
import { Input, EventEmitter } from '@angular/core';
import { SelectionModel } from './selection-model';
import { UiCommonComponent } from '../../ui-common/ui-common.component';


@Component({
  selector: 'controllable',
  template: ``
})
export class Controlable

implements ControlableApi{




  link(){}

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


  constructor( injector: Injector ){

  }

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

  isColleation = true;



  // constructor(){
  //     super();
  // }

  // /**
  //  * общие управляемые свойства компонентов представления
  //  */
  // static inputs: Array<string> = [
  //     'selectable','draggable','droppable'
  // ];

  // @Input() draggable: boolean = false;
  // @Output() dragged = new EventEmitter();

  // @Input() droppable: boolean = false;
  // @Output() dropped = new EventEmitter();



  @Input()
  set multiselect( value ) {
      this.selection.multi = value;
  }



  // selection
  @Output('selected') onSelect = new EventEmitter();
  selection: SelectionModel = new SelectionModel(  );
  setSelectionMode( multiselect: boolean ) {
      this.selection.multi = multiselect;
  }



}
