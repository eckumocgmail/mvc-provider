import { Component, OnInit, TemplateRef, Input, Injector, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { SelectionModel } from '../../ui-control/control-api/selection-model';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'collection-grid,app-grid',
  template: `
    <div class="app-grid">
        <span *ngFor="let griditem of griditems"
              (click)="select( griditem )"
              [ngClass]="{
                'selected':              griditem.selected,
                'grid-item':         true,
                'grid-item-large':   false
              }" >
            <ng-container *ngTemplateOutlet="template||defaults; context: { ctrl: griditem }">
            </ng-container>
        </span>
    </div>

    <ng-template #defaults let-ctx="ctx" let-ctrl="ctrl">
      {{ ctrl.title }}
    </ng-template>

  `,
  styles: [
    `.app-grid{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .app-grid-item *{
      padding: 12px;
      color: white;
    }
    .app-grid-item-small{
      margin: 10px;
      float: left;
      width: 120px;
      height: 80px;
      vertical-align: center;
    }
    .app-grid-item-large{
      margin: 10px;
      float: left;
      width: 320px;
      height: 240px;
      vertical-align: center;
    }
    .app-grid-item-default{
        margin: 10px;
        float: left;
        width: 220px;
        height: 180px;
        vertical-align: center;
    }`
  ]
})
export class CollectionGridComponent implements OnInit {
  @Output('selected') onSelect = new EventEmitter();

  //selection
  selection: SelectionModel = new SelectionModel(  );

  selectable= true;
  ngOnInit(): void {
  }


  @Input()
  template: TemplateRef<any>;
  size:                      'default'|'small'|'large' = 'default';
  gridSizeClassname = 'grid-item-default';

  @Input()
  griditems: any[] = [
    { title: 'webapi data loading tool' },
    { title: 'intergration services administration tool' },
    { title: 'win services scheluder tool' },
    { title: 'database administration tool' },
    { title: 'big data analitization tool' },
  ];

    @Input()
    set multiselect( value ) {
        this.selection.multi = value;
    }



    select( p ) {

      if ( this.selectable ) {
          this.selection.toggle( p );
          this.onSelect.emit( p );
      }
    }
    keypress(evt: Event){
      evt.preventDefault();
      evt.stopPropagation();

    }



  constructor( injector: Injector ) {

  }

  ngOnChanges( changes: SimpleChanges ) {
    if ( changes.size ) {
      this.gridSizeClassname = 'grid-item-' + this.size;
    }
  }



}
