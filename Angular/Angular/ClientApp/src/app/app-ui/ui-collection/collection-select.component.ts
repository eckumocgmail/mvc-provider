import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'collection-select,app-collection-select,app-collection-settings',
  template: `
    <div>
      <div>
        <mat-button-toggle-group [value]="value">
          <mat-button-toggle value='tree' (change)="change.emit($event)">
              <mat-icon> account_tree </mat-icon>
          </mat-button-toggle>
          <mat-button-toggle value='grid' (change)="change.emit($event)">
              <mat-icon> apps </mat-icon>
          </mat-button-toggle>
          <mat-button-toggle value='table' (change)="change.emit($event)">
              <mat-icon> table </mat-icon>
          </mat-button-toggle>
          <mat-button-toggle value='list' (change)="change.emit($event)">
              <mat-icon> list </mat-icon>
          </mat-button-toggle>
        </mat-button-toggle-group>
      </div>
    </div>
  `,
  styles: [
  ],
  inputs:       ['value']
})
export class CollectionSelectComponent implements OnInit {

  value = 'list';
  @Output() change = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
