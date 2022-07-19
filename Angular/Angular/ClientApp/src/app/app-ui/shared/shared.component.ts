import { GridComponent } from './grid/grid.component';
import { ToogleComponent } from './radiogroup/toogle/toogle.component';
import { Component, SimpleChanges, Input } from '@angular/core';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';

import { CardComponent } from './card/card.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';

import { SearchComponent } from './search/search.component';
import { RadiogroupComponent } from './radiogroup/radiogroup.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NavComponent } from './nav/nav.component';


import { ModalComponent } from './modal/modal.component';
import { FrameComponent } from './frame/frame.component';
import { TextComponent } from './text/text.component';
import { SplitComponent } from './split/split.component';
import { ModalConfirmComponent } from './modal/modal-confirm.component';
import { SelectboxComponent } from './form/selectbox/selectbox.component';
import { CheckboxComponent } from './form/checkbox/checkbox.component';
import { ButtonComponent } from './form/button/button.component';
import { TabsComponent } from './tabs/tabs.component';
import { NavBadgedComponent } from './nav-badged/nav-badged.component';
import { SpinnerComponent } from './spinner/spinner.component';

@Component({
  selector: 'app-shared',
  template: `
    <select class="custom-select" (change)="trace($event)">
      <option selected>Open this select menu</option>
      <option *ngFor="let option of types"  [value]="option">{{option}}</option>
    </select>

    <div *ngIf="type">
      <div [ngSwitch]="type">
        <div *ngFor="let ptype of types">
          <div *ngIf="ptype===type">
            <!-- todo outlet for this component {{ map[ptype].name }} -->
            <ng-container *ngComponentOutlet="map[ptype]"></ng-container>

          </div>
        </div>
      </div>

    </div>
  `
})
export class SharedComponent
{

  trace(evt){
    console.log(this.type = evt.target.value);
  }

  @Input()
  components=[
      SpinnerComponent,
      GridComponent,
      ButtonComponent,
      CheckboxComponent,
      TabsComponent,
      CardComponent,
      ModalConfirmComponent,
      NavComponent,
      NavBadgedComponent,
      PaginationComponent,
      RadiogroupComponent,
      SearchComponent,
      SelectboxComponent,
      ProgressbarComponent,
      CardComponent,
      SelectboxComponent,
      RadiogroupComponent,
      NavComponent,
      TableComponent,
      FormComponent,
      ToogleComponent,
      FrameComponent,
      TextComponent,
      SplitComponent
  ]

  type: string;
  types: string[] = [];
  map: { [property: string ]: any} = {};



  @Input()
  properties: object = {};

  constructor(  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.components ){
      this.update();
    }
  }

  ngOnInit(): void {
    this.update();
  }

  update(){
    this.map = this.parseMapOfTypes( this.components );

    this.types = Object.getOwnPropertyNames( this.map );
    this.type = ( this.types.length === 0 )? null: this.types[0];
  }

  parseMapOfTypes(components: any[]): object{
    const map = {};
    const ctrl = this;
    components.forEach(cmp=>{
      const type: string = ctrl.parseType(cmp);
      map[type] = cmp;
    })
    return map;
  }

  parseType(cmp: any): string {
    return cmp.name;
  }
}
