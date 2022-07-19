import { Component, OnInit, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UiCommonComponent } from '../../ui-common/ui-common.component';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
  icon: 'info',
  label: 'Dialog info',
  tooltip: 'Information dialog can be useable for perfoming user actions.'
})
@Component({
  selector: 'dialog-info',
  template: `
    <layout-dialog style="width: 100%; max-height: 360px;"
        class="confirm-pane-layout">
      <div style="width: 100%;"
          class="confirm-pane-header">
          {{ title }}
      </div>
      <div style="width: 100%;">
          {{ message }}
      </div>
      <div style="width: 100%; height: 40px;" class="confirm-pane-actions">
        <button mat-raised-button class="confirm-actions-ok" (click)="ok()"> ok </button>
      </div>
    </layout-dialog>`,
  styles: [
  ]
})
export class DialogInfoComponent
extends UiCommonComponent
{
  @Input()
  title: string = 'info dialog';

  @Input()
  message = 'this is a test';

  @Output()
  actionPerformed = new EventEmitter();


  constructor( injector: Injector ) {
    super( injector );
  }

  ok(){
    this.actionPerformed.emit('ok');
  }
}
