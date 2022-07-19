import { Component, OnInit, Injector, ElementRef } from '@angular/core';
import { UiCommonComponent } from '../ui-common/ui-common.component';
import { SvgElement } from './svg-element';


export class SvgCircle
extends SvgElement
{
  cx: number;
  cy: number;
  r: number;

  stroke: string = 'green';
  fill: string = 'fill';


  //<circle [attr.cx]="cx" [attr.cy]="cy" [attr.r]="r" [attr.stroke]="stroke" [attr.fill]="fill" [attr.stroke-width]="strokeWidth" />
  constructor( cx, cy ) {
    super('circle');
    this.cx = cx;
    this.cy = cy;
    this.update();
  }

  update(){
    this.setAttribute('cx',this.cx);
    this.setAttribute('cy',this.cy);
    this.setAttribute('style','stroke-width:3;stroke:rgb(0,0,0)');
  }



}
