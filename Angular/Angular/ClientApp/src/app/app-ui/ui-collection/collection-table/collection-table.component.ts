import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, TemplateRef, Injector } from '@angular/core';
import { SelectionModel } from '../../ui-control/control-api/selection-model';
import { Controlable } from '../../ui-control/control-api/controlable';

@Component({
  selector: 'collection-table,app-table',
  template: `
  <ng-template #defaults let-ctrl="ctrl" let-ctrl="ctrl" let-ctx="ctx" let-model="model">
    {{ ctrl }}
    {{ctrl['selected'] }}
  </ng-template>


  <table style="width: 100%;" class="mat-table  table-hover table-striped" matSort (matSortChange)="sortRows($event)">

    <thead class="app-table-header thead-dark"
          style="color: var(--light-color); background-color: var(--dark-color);">
      <tr>


        <th *ngIf="checkable">
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="autoSizingCheck">
            <label class="form-check-label" for="autoSizingCheck"></label>
          </div>
        </th>



        <th *ngFor="let column of columns"
            (click)="sortRows({ active: column })">
          {{ column }}

        </th>
      </tr>
    </thead>

    <tbody>
      <tr *ngFor="let row of dataset">
        <td *ngIf="checkable">
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="autoSizingCheck">
            <label class="form-check-label" for="autoSizingCheck"></label>
          </div>
        </td>
        <td *ngFor="let column of columns"
            [ngClass]="{ 'selected': row['selected'] }"
            [attr.draggable]="draggable"
            [attr.droppable]="draggable"
            (dragstart)="dragStart( $event,row )"
            (dragover)="dragOver( $event )"
            (dragover)="dragLeave( $event )"
            (drop)="drop( $event )"
            (click)="select( row )">

          <!-- {{ row[column]|json }} -->
          <ng-container *ngTemplateOutlet="template||defaults; context: { ctrl: row[column] }"></ng-container>

        </td>
      </tr>
    </tbody>

    <tfoot>
        <tr>
            <td *ngFor="let column of columns"></td>
        </tr>
    </tfoot>

  </table>

  <!-- <mat-table [dataSource]="model.dataset"
             #table>

     User name Definition
    <div *ngIf="model">
      <ng-container *ngFor="let column of model.columns"
                    cdkColumnDef="{{ column }}">
        <mat-header-row *cdkHeaderrowDef> {{ column }} </mat-header-row>
        <mat-row *cdkrowDef="let row"> {{ row[ column ] }} </mat-row>
      </ng-container>


      <mat-header-row *cdkHeaderRowDef="model.columns"></mat-header-row>
      <mat-row *cdkRowDef="let row; columns: model.columns"></mat-row>
    </div>

  </mat-table> -->

  `,
  styles: [
    `
      .selected
      {
        background-color: black;
        color: white;
      }
    `
  ],
  inputs: [
    'columns','dataset','sortable','checkable'
  ]
})
export class CollectionTableComponent
{
  title:        string = 'Table component';
  isColleation = true;

  constructor(  ) {}

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













/**selectable
     * общие управляемые свойства компонентов представления
     */
    static inputs: Array<string> = [
      'selectable','draggable','droppable'
  ];


  link(){}
  sortRows( p: any ){}

  //focus
  //createFocusManager(): FocusModel;
  //focus: FocusModel;






    columns:      Array<string> = [ 'key', 'value' ];         //отображаемые колонки
    dataset:      Array<any> =    [{ key: 1, value: 'v1' }];  //массив данных
    rows:         Element[]=[];        //массив элементов

    selectionTarget: "row"|"col"|"cell" = "col";

    @Input()
    template: TemplateRef<any>;



    ctrl: Controlable;



    remove(){
        this.removeSelectedRows();
    }
    removeSelectedRows(){
        if( !this.selection.selected )return;
        let items = this.selection.selected;
        if( !(this.selection.selected instanceof Array) ){
            items = [ this.selection.selected ];
        }
        for( let i=0; i<items['length']; i++ ){
            const index = this.rows.indexOf( items[i] );
            this.dataset = (this.dataset.length>1 )? this.dataset.splice( index,1 ): [];
        }
        this.update();
    }


    update(){
        if( !this.dataset ){
            this.rows = [];
        }else{
            if( this.columns.length > 4 ){
              //throw new Error('Too much columns displaying at table');
              this.columns = this.columns.splice(0,this.columns.length-2);
            }
            this.rows = this.dataset.map(
              (dataModel)=>{
                return Object.assign( dataModel, new Element());
              }
            );
        }

        //this.rows = this.dataset.map(( item )=>{ return Object.assign(item,new Element({})); });
        //this.rows = this.dataset;
    }


    // ngOnChanges( changes: SimpleChanges ): void {
    //     if( changes.dataset ){
    //         this.update();
    //     }
    //     this.changes.emit(changes);
    // }

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





    /**
     * инициаллизация

    ngOnInit(): void {

        this.init.emit(this);
        //this.focus = this.createFocusManager();
        this.update();
    }
 */
    ngOnDestroy(): void {
        this.destroy.emit(this);
    }
    ngDoCheck(): void {
        this.check.emit(this);
    }

    //selection

    setSelectionMode( multiselect: boolean ){
        if( this.selection.multi = multiselect ){
          this.selection.selected = [];
        }

    }

    //focus


  }
