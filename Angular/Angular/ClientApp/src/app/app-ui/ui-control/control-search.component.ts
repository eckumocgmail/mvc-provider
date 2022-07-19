import { UiCommonComponent } from '../ui-common/ui-common.component';
import { Component, Input, Injector, Output, EventEmitter } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'control-search,app-search',
  template: `

    <div class="search-box-container" (submit)="onSearch( query.value )" style="display: flex; flex-direction: row; flex-wrap: nowrap;">
      <input [attr.datalist]="datalistid" [attr.list]="datalistid" #query
            (keypress)="onKeypress( $event )" (input)="onInputQuery($event)"
            type="search"
            class="search-box-container form-control"
            style="top: 0px; left: 0px; width: 100%;">
      <button class="btn btn-primary" type="submit" (click)="onSearch( query.value )">поиск</button>
      <datalist [attr.id]="datalistid">
        <option *ngFor="let option of options" >{{ option }}</option>
      </datalist>
    </div>


  `,
  styles: [
    `
    .search-box{
        border-radius: 5px;

        display: flex;
        flex-direction: row;
        width: 150px;
        transition: width 0.3s;
    }
    .search-box.focused{
        width: 100%;
        transition: width 0.3s;
    }
    .search-box-container{

    }

    `
  ]
})
export class ControlSearchComponent  extends UiCommonComponent{
  static n = 0;
  query;
  datalistid = 'datalist-'+(ControlSearchComponent.n++);

  @Input('options')
  options: string[] = [];

  @Output()
  public search = new EventEmitter();

  @Output()
  queryChanged = new EventEmitter();


  constructor( injector: Injector ){
    super( injector );
  }

  onInputQuery( query ){
    this.query = query;
    this.queryChanged.emit(query);
  }


  onSearch( query: string ) {
      this.search.emit( query );
  }

  onKeypress( evt ) {
      if ( evt.code.toLowerCase() == 'enter' ) {
          this.onSearch( this.query );
      }
  }

}
