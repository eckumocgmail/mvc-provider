import { UiCommonComponent } from './../../ui-common/ui-common.component';
import {Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'layout-card',
    tooltip:  'Layout content in shadowbox pane.',
    example:  `
      <layout-card [photo]="userPhoto" [actions]="['like']" (actionPerforemed)="photo.incRating()">
      </layout-card>


    `
})
@Component({
  selector: 'layout-card',
  styles: [
    `.card {
      min-width: 125px;
      min-height: 100px;
      max-width: 125px;
      max-height: 100px;
      width: 125px;
      height: 100px;
    }`
  ],
  template: `

  
  <mat-card style="width: 100%; height: 100%;">
    <mat-card-header style="width: 100%;">
        <mat-card-title>{{ photo.title }}
            <ng-content select="top" #titleContent></ng-content>
        </mat-card-title>
        <mat-card-subtitle>{{ photo.subtitle }}
            <ng-content select="mat-toolbar" #subtitleContent></ng-content>
        </mat-card-subtitle>
    </mat-card-header>
    <img mat-card-image [attr.src]="photo.src" [attr.alt]="photo.alt">
    <mat-card-content  style="width: 100%; height: 100%;">
        <ng-content select="*:not(.title):not(.subtitle):not(.actions)"></ng-content>
        <p>{{ photo.text }}</p>
    </mat-card-content>
    <mat-card-actions style="width: 100%;">
      <button mat-button *ngFor="let action of actions" (click)="onClick(action)">{{ action }}</button>
    </mat-card-actions>
  </mat-card>
  `
})
export class LayoutCardComponent
extends UiCommonComponent {

  @Input()
  actions = ['like'];

  @Output()
  actionPerformed = new EventEmitter();

  @Input()
  photo = {
    title:    "Photo-card",
    subtitle: "Card-layout component",
    src:      "https://material.angular.io/assets/img/examples/shiba2.jpg",
    text:     "This is a details text about you.",
    alt:      "Photo of a Shiba Inu"
  }

  constructor( injector: Injector ){
    super( injector );
  }

  onClick( action ){
    this.actionPerformed.emit( action );
  }



}
