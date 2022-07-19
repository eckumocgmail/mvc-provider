import { UiLayoutModule } from './../../ui-layout/ui-layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';
import { UiControlModule } from '../../ui-control/ui-control.module';


@NgModule({
  declarations: [DialogConfirmComponent],
  imports: [
    CommonModule,
    UiControlModule,
    UiLayoutModule
  ],
  exports: [DialogConfirmComponent]
})
export class DialogConfirmModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

