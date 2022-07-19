import { UiLayoutModule } from './../../ui-layout/ui-layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogInfoComponent } from './dialog-info.component';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';



@NgModule({
  declarations: [DialogInfoComponent],
  imports: [
    CommonModule,
    UiLayoutModule
  ],
  exports: [DialogInfoComponent]
})
export class DialogInfoModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

