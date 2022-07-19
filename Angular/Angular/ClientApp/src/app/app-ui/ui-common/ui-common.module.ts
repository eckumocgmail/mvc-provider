import { CommonJitComponent } from './common-jit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCommonComponent } from './ui-common.component';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';


@NgModule({
  declarations: [UiCommonComponent,CommonJitComponent],

  imports: [
    CommonModule
  ],
  exports: [
    UiCommonComponent,CommonJitComponent
  ]
})
export class UiCommonModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}


