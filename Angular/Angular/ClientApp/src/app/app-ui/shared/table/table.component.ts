import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, TemplateRef, Injector, OnChanges, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, OnChanges, OnDestroy  {

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
  @Input() public template: TemplateRef<any>;
  @Input() public isColleation = true;
  @Input() public title:        string = 'Table component';
  @Input() public columns:      Array<string> = [ 'key', 'value' ];         //отображаемые колонки
  @Input() public dataset:      Array<any> =    [{ key: 1, value: 'v1' }];  //массив данных
  @Input() public selectionTarget: "row"|"col"|"cell" = "col";

  public rows: any[]=[];        //массив элементов

  public isSearchable(){  return this.searchable;     };
  public isSortable(){    return this.sortable;     };
  public isSelectable(){  return this.selectable;     };
  public isFocusable(){   return this.focusable;      };
  public isEditable(){    return this.editable;    };
  public isDraggable(){   return this.draggable;      };
  public isDroppable(){   return this.droppable;      };

  @Output() dragged = new EventEmitter();
  @Output() dropped = new EventEmitter();
  @Output() init = new EventEmitter();
  @Output() destroy = new EventEmitter();
  @Output() changes = new EventEmitter();
  @Output() check = new EventEmitter();
  @Output('selected') onSelect = new EventEmitter();

  ngOnInit(): void {
      this.init.emit(this);
      this.update();
  }

  ngOnDestroy(): void {
      this.destroy.emit(this);
  }

  ngDoCheck(): void {
      this.check.emit(this);
  }

  ngOnChanges( changes: SimpleChanges ): void {
    this.update();
    this.changes.emit(changes);
  }


  update(){
    if( !this.dataset ){
        this.rows = [];
    }else{
        if( this.columns.length > 4 ){
          this.columns = this.columns.splice(0,this.columns.length-2);
        }
        this.rows = this.dataset.map(
          (dataModel)=>{
            return dataModel;
          }
        );
    }
  }

  select( p ){
    if( this.selectable ){
        this.onSelect.emit( p );
    }
  }

  keypress( $event ){

  }

  dragStart( $event, griditem ){

  }

  dragOver( $event ){

  }

  dragLeave( $event ){

  }

  drop(evt){

  }

  sortByColumn( column: string ){
  }

  getCellValue( i,j ){
      return this.rows[i][this.columns[j]];
  }

  getColumn( j: number ){
      const col = this.columns[ j ];
      const values = [];
      this.rows.forEach(row=>{ values.push(row[col]); })
      return values;
  }

}
