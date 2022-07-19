import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { UiLayoutModule } from './../ui-layout/ui-layout.module';
import { UiDialogComponent } from './ui-dialog.component';
import { DialogSelectModule } from './dialog-select/dialog-select.module';
import { DialogInputModule } from './dialog-input/dialog-input.module';
import { DialogConfirmModule } from './dialog-confirm/dialog-confirm.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogInfoModule } from './dialog-info/dialog-info.module';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';
import { MatIconModule } from '@angular/material/icon';
import { UiControlModule } from '../ui-control/ui-control.module';
import { UiCollectionModule } from '../ui-collection/ui-collection.module';



@NgModule({
  declarations: [
    UiDialogComponent
  ],
  imports: [
    CommonModule,
    UiLayoutModule,
    UiControlModule,
    UiCollectionModule,
    DialogConfirmModule,
    DialogInputModule,
    DialogSelectModule,
    DialogInfoModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  exports: [
    UiDialogComponent,
    DialogConfirmModule,
    DialogInputModule,
    DialogSelectModule,
    DialogInfoModule
  ]
})
export class UiDialogModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

