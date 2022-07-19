import { Component, Injector, Input, Output } from '@angular/core';
import { UiCommonComponent } from '../../ui-common/ui-common.component';
import { specification } from 'src/app/app-ui/ui-common/specification.function';
import { EventEmitter } from 'events';


@specification({
  icon: 'question_answer',
  label: 'Dialog confirm',
  tooltip: 'Confirmation dialog can be useable for delete operations.'
})
@Component({
  selector: 'dialog-confirm',
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
        <!-- <button mat-raised-button class="confirm-actions-ok" (click)="ok()"> ok </button> -->
        <button mat-raised-button (click)="cancel()"
        *ngFor="let action of actions" > {{action}} </button>


      </div>
    </layout-dialog>`,
  styles: [`
      .confirm-pane-layout > *{
        padding: 20px;
      }
      .confirm-pane-layout .confirm-pane-header,
      .confirm-pane-layout .confirm-pane-actions .confirm-actions-ok
      {
        background-color: #3f51b5;
        color: white;
      }`
  ]
})
export class DialogConfirmComponent
extends UiCommonComponent
{

  @Input()
  title: string = 'Confirmation pane';

  @Input()
  message: string = 'Are you realy want to contine?';

  @Input()
  actions: ['ok','cancel'];

  @Input()
  validated = false;

  @Output()
  actionPerformed = new EventEmitter();


  constructor( injector: Injector ) {
    super( injector );
  }


  ok(){
    if( this.validated ){
      this.actionPerformed.emit( 'ok' );
    }

  }

  cancel(){
    this.actionPerformed.emit( 'cancel' );
  }
}
