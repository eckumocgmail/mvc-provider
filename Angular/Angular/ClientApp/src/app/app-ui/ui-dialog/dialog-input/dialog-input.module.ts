import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogInputComponent } from './dialog-input.component';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';
import { UiLayoutModule } from '../../ui-layout/ui-layout.module';
import { UiFormsModule } from '../../ui-forms/ui-forms.module';



@NgModule({
  declarations: [DialogInputComponent],
  imports: [
    CommonModule,
    UiLayoutModule,
    UiFormsModule
  ],
  exports: [DialogInputComponent]
})
export class DialogInputModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

