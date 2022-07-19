import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, Output} from '@angular/core';
import { Directive} from '@angular/core';
import { OnInit} from '@angular/core';
import { ElementRef} from '@angular/core';
import { EventEmitter} from '@angular/core';

@Component({
  selector: 'chapter',
  template: '<span [ngClass]="classes"></span>'
})
export class UiDivDirective implements OnInit{

  @Output() init = new EventEmitter();

  public classes = {
    'mat-small': false,
    'mat-caption': true,
    'mat-body-strong': false,
    'mat-display-1': false,
    'mat-display-2': false,
    'mat-display-3': false,
    'mat-display-4': false,
    'mat-body-2': false
  };

  constructor( public elementRef: ElementRef ){}

  ngOnInit(): void {
    this.init.emit( this );
  }

}
