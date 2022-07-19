import { Component, OnInit, Input } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'Control button',
    tooltip:  'Button can perfom action or enable some options.'
})
@Component({
  selector: 'control-button',
  template: `
    <button mat-raised-button (click)="doAction()">{{ label }}</button>
  `,
  styles: [
  ]
})
export class ControlButtonComponent implements OnInit {

  @Input()
  label: string = 'ok';

  @Input()
  action: Function = function(){

  };

  constructor() { }

  ngOnInit(): void {
  }

  doAction(){
    this.action();
  }

}
