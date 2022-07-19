import { SvgCircle } from './svg-circle.svg-element';
import { Component, OnInit, Injector } from '@angular/core';
import { UiCommonComponent } from '../ui-common/ui-common.component';
import { SvgElement } from './svg-element';

@Component({
  selector: 'svg-pane',
  template: `
    <button (click)="add()"> добавить </button>
    <svg version="1.1" [attr.height]="height" [attr.width]="width" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
         x="0" y="0" [attr.viewBox]="'0 0 '+width+' '+height"
         xml:space="preserve"
         [attr.id]="id"
         style="border: 1px solid black"
         fill="292F33">
    </svg>
    <div *ngFor="let element of elements" [attr.id]="element.id">
      {{ element.layout(id) }}
    </div>
  `
})
export class SvgPaneComponent
extends SvgElement
implements OnInit
{


  width='100';
  height='100';
  elements: SvgElement[] = [
  ];

  constructor(   ) {
    super( 'pane' );
  }

  add(){
    this.elements.push(new SvgCircle(10,10));
  }

  ngOnInit(): void {

  }

}
