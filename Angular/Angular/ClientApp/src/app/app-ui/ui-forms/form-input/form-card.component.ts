import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'form-card',
  template: `
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-pills card-header-pills">

          <ng-content select=".top"></ng-content>

        </ul>
      </div>
      <div class="card-body">
        <div class="card-title"> {{ title }} </div>
        <layout-line>

          <ng-content select="*:not(.top)"></ng-content>

        </layout-line>
      </div>
    </div>

  `
})
export class FormCardComponent implements OnInit {


  active = 'Account';
  navigation: any[] = [];
  title = '';

  @Input()
  target: any;

  @Input()
  action: string = 'Create';


  @Output()
  completed = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
