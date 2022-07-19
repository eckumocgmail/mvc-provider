import { UiLayoutModule } from './../ui-layout/ui-layout.module';
import { UiCommonModule } from './../ui-common/ui-common.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiControlModule } from '../ui-control/ui-control.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UiCommonModule,
    UiControlModule,
    UiLayoutModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    UiCommonModule,
    UiControlModule,
    UiLayoutModule

  ]
})
export class FeatureDepsModule
{

}
