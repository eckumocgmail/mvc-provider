import {Directive} from '@angular/core';
import {ElementRef} from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Directive({
  selector: '[onShow]'
})
export class LayoutShowDirective  {

  constructor( private elementRef: ElementRef ) { }

}
