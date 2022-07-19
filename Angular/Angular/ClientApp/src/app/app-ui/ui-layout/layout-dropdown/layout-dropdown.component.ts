import {Output} from '@angular/core';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


/**
 *
 */
@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'layout-dropdown',
  inputs: ['opened'],
  templateUrl: './layout-dropdown.component.html',
  animations: [
  ]
})
export class LayoutDropDownComponent  {

  @Output()
  onOpen = new EventEmitter();
  opened = true;

  constructor() { }

  toggle() {
    this.opened = this.opened ? false : true;
  }

}
