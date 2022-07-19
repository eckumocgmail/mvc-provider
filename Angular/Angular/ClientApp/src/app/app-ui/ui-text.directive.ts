import { AfterViewInit} from '@angular/core';
import { Directive} from '@angular/core';
import { OnChanges} from '@angular/core';
import { ElementRef} from '@angular/core';


@Directive({
    selector: '[appPrintText],ui-text',
    inputs: ['appPrintText','timems']
})
export class UiTextDirective
implements AfterViewInit, OnChanges{

  classes = {
    '.mat-small': false,
    '.mat-caption': false,
    '.mat-body-strong': false,
    '.mat-display-1': false,
    '.mat-display-2': false,
    '.mat-display-3': false,
    '.mat-display-4': false,
    '.mat-body-2': false
  };

  cursor: number = 0;
  timems: number = 75;
  appPrintText: string;

  constructor( private elementRef: ElementRef ){}

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
      this.start();
  }

  ngAfterViewInit(): void {
      this.start();
  }

  start(){
      const ctrl = this;
      if( !ctrl.appPrintText ) throw new Error('no text defined at appPrintText attribute');
      const dom = this.elementRef.nativeElement;
      function next(){
          if( ctrl.cursor<ctrl.appPrintText.length ){
              dom.innerHTML += ctrl.appPrintText[ctrl.cursor];
              ctrl.cursor++;
              setTimeout(next, ctrl.timems);
          }
      }
      next();
  }



}
