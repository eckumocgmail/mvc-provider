import { Component, Injector, Input, Output, ViewChild } from '@angular/core';
import { EventEmitter } from 'events';
import { UiCommonComponent } from '../../ui-common/ui-common.component';
import { specification } from 'src/app/app-ui/ui-common/specification.function';
import { InputFormComponent } from '../../ui-forms/input-form/input-form.component';


@specification({
  icon: 'info',
  label: 'Dialog info',
  tooltip: 'Information dialog can be useable for perfoming user actions.'
})
@Component({
  selector: 'dialog-input',
  template: `
    <layout-dialog style="width: 100%; max-height: 360px;" class="confirm-pane-layout">
      <div style="width: 100%;" class="confirm-pane-header">
          {{ title }}
      </div>
      <div style="width: 100%;">
        <input-form #inputForm [properties]="properties"></input-form>
      </div>
      <div style="width: 100%; height: 40px;" class="confirm-pane-actions">
        <button mat-raised-button class="confirm-actions-ok" (click)="ok()"> ok </button>
      </div>
    </layout-dialog>
  `,
  styles: [
  ]
})
export class DialogInputComponent
extends UiCommonComponent
{
  @Input()
  title: string = 'info dialog';

  @Input()
  message = 'this is a test';

  @Input()
  properties = {};

  @Output()
  actionPerformed = new EventEmitter();


  @ViewChild('inputForm', { static: true })
  inputForm: InputFormComponent;

  constructor( injector: Injector ) {
    super( injector );
  }

  ok(){
    if( this.inputForm.validated ){
      this.actionPerformed.emit('ok');
    }
  }
}

