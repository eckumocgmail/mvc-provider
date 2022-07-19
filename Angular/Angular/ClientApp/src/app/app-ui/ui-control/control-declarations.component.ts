import { AbstractComponent } from 'src/app/app-ui/ui-common/core-abstract/abstract-component';
import { Injector, Type } from '@angular/core';
import { Controlable } from './control-api/controlable';

import { types } from 'util';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AbstractModule } from 'src/app/app-ui/ui-common/core-abstract/abstract-module';
import { CoreBuildService } from 'src/app/app-ui/ui-common/core-build.service';

/**
 * Выбор компонента внутри модуля
 */
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'control-declarations',
  template: `

    <div>
      {{pmodule}}{{ pmodules.length }}
      <control-select *ngIf="editable" [options]="pmodules" (onChanged)="pmodule=$event"></control-select>
      <control-select  [options]="pmodule.declarations" (onChanged)="pcomponent=$event"></control-select>

      <div *ngIf="pcomponent">
        <ng-container *ngComponentOutlet="pcomponent"></ng-container>
      </div>
    </div>

  `,
  inputs: [
    'pmodule'
  ],
  styles: [
  ]
})
export class ControlDeclarationComponent
extends Controlable {

  pmodules: AbstractModule[] = [];
  pmodule: AbstractModule;
  pcomponent: any;


  constructor( private injector: Injector, private build: CoreBuildService ){
    super( injector );
    this.pmodules = this.build.root.list();
    this.pmodule = this.pmodules[1];
  }

}
