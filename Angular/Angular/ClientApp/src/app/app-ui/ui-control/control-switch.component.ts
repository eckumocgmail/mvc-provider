
import { types } from 'util';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'control-switch',
  template: `

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


  `,
  styles: [
  ]
})
export class ControlSwitchComponent implements OnInit, OnChanges {

  @Input()
  type: string;
  types: string[];
  map: { [property: string ]: any} = {};

  @Input()
  components: any[] = [];

  @Input()
  properties: object = {};

  constructor(  ) {
    window['sw']=this;
  }

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
