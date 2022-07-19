import { UiCommonComponent } from '../ui-common/ui-common.component';
import { Component, Input, Output, EventEmitter, OnInit, Injector } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'apps',
    label:    'Radiogroup',
    tooltip:  'Radiogroup provider interface to select from toggling buttons.'
})
@Component({
    selector: 'control-nav',
    inputs:   ['options', 'selected'],
    template: `


      <mat-nav-list [ngStyle]="orientation==='horizontal'? horizontal: vertical">
        <a mat-list-item *ngFor="let option of options"
            [routerLink]="[option.path?option.path:option]"
            [routerLinkActive]="['link-active']"
            [routerLinkActiveOptions]="{ exact: true }">
          <mat-icon *ngIf="option.icon">{{option.icon}}</mat-icon>
          <div *ngIf="!option.label">{{option}}</div>
          <div *ngIf="option.label">{{option.label}}</div>

        </a>

      </mat-nav-list>
      <!-- <div >
        <button mat-raised-button *ngFor="let option of options" [routerLink]="[option.path?option.path:option]"
            [routerLinkActive]="['link-active']"
            [routerLinkActiveOptions]="{ exact: true }">
          <mat-icon *ngIf="option.icon">{{option.icon}}</mat-icon>
          <div *ngIf="!option.label">{{option}}</div>
          <div *ngIf="option.label">{{option.label}}</div>
        </button>
      </div> -->

    `,
    styles: [

    ],
})
export class ControlNavComponent extends UiCommonComponent{

  @Input()
  orientation: 'vertical'|'horizontal' ;

  horizontal = {
    'display': 'flex',
    'flex-direction': 'row'
  };
  vertical = {
    'display': 'flex',
    'flex-direction': 'column'
  };

  @Input()
  options: string[]|{ label?: string, icon?: string}[]  = [ 'table', 'tree', 'grid' ];
  value: any = 'table';

  @Input()
  selected: any = this.value;

  @Output()
  onChanged = new EventEmitter();

  constructor( injector: Injector ){
    super( injector );
  }
}
