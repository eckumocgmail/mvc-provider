import { EventEmitter, Component, OnInit, Injector, Input, Output } from '@angular/core';
import { UiCommonComponent } from '../../ui-common/ui-common.component';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
  icon: 'info',
  label: 'Dialog select',
  tooltip: 'Selection dialog can be useable for questionnaires.'
})
@Component({
  selector: 'dialog-select',
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
        <button mat-raised-button class="confirm-actions-ok"
               *ngFor="let option of options"
               (click)="select( option )">
          <mat-icon *ngIf="option.icon">{{option.icon}}</mat-icon>
          {{ option.label? option.label: option }}
        </button>
      </div>
    </layout-dialog>
  `,
  styles: [
  ]
})
export class DialogSelectComponent
extends UiCommonComponent
{
  @Input()
  title: string = 'info dialog';

  @Input()
  message = 'this is a test';

  @Output()
  actionPerformed = new EventEmitter<any>();

  @Input()
  options: string[] | {label: string, icon: string}[] = [];

  constructor( injector: Injector ) {
    super( injector );
  }

  select( selected: string | {label: string, icon: string}  ){
    this.actionPerformed.emit( selected );
  }
}
