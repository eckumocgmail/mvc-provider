import { UiCommonModule } from './../../ui-common/ui-common.module';
import { FeatureMarkComponent } from './feature-mark.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FeatureMarkComponent],
  exports: [
    FeatureMarkComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UiCommonModule
  ]
})
export class FeatureMarkModule { }
