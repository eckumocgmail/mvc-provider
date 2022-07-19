import { MatIconModule } from '@angular/material/icon';
import { UiControlModule } from 'src/app/app-ui/ui-control/ui-control.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogSelectComponent } from './dialog-select.component';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';
import { UiLayoutModule } from '../../ui-layout/ui-layout.module';



@NgModule({
  declarations: [DialogSelectComponent],
  imports: [
    CommonModule,
    UiLayoutModule,
    UiControlModule,
    MatIconModule
  ],
  exports: [DialogSelectComponent]
})
export class DialogSelectModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

