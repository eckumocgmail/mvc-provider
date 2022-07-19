import { Component, OnInit, Input } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'control-menu',
  template: `
    <div>
      <button mat-raised-button [matMenuTriggerFor]="menu" [color]="color">
        <mat-icon *ngIf="icon"> {{ icon }} </mat-icon> {{ label }}
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item *ngFor="let menuitem of menuitems" [routerLink]="[menuitem.path]">
          <mat-icon *ngIf="menuitem.icon"> {{ menuitem.icon }} </mat-icon>
          <span> {{ menuitem.label }} </span>
        </button>
      </mat-menu>
    </div>
  `,
  styles: [
  ]
})
export class ControlMenuComponent implements OnInit {

  @Input()
  color: 'primary'|'secondary' = 'primary';

  @Input()
  icon: string;

  @Input()
  label: string = 'ok';

  @Input()
  path: string = './';

  public onClick = function(){

  }

  @Input()
  menuitems: ControlMenuComponent[] = [];

  constructor() { }

  ngOnInit(): void {
  }



}
