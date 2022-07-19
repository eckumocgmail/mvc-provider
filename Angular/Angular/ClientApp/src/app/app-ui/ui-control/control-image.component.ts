import {SimpleChanges} from '@angular/core';
import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {OnChanges} from '@angular/core';
import {style} from '@angular/animations';

import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'app-image',
  template: `
      <img [attr.src]="url" [ngStyle]="style" />

  `,
  inputs: ['url', 'size']
})
export class ControlImageComponent implements OnInit, OnChanges {

  url: string;
  size: Array<string> = ['320px', '320px'];
  style = {};

  constructor(   ) {}

  ngOnInit( ) {
    const ctrl = this;
  }

  ngOnChanges( changes: SimpleChanges ) {

      this.style = {
        width:            this.size[0],
        height:           this.size[1],
        backgroundSize: 'cover',
        backgroundImage: 'url(' + this.url + ')'
      };

  }

  update() {


    console.log('update');

  }

}
