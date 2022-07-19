import {Directive} from '@angular/core';
import {ElementRef} from '@angular/core';

@Directive({
    selector: '[tabindex]'
})
export class UiTabIndexDirective {

  constructor( private elementRef: ElementRef ) {}

}
