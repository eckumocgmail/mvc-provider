import { FeatureLibComponent } from './feature-lib.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiCommonModule } from '../../ui-common/ui-common.module';

@NgModule({
  declarations: [FeatureLibComponent],
  exports: [FeatureLibComponent],
  imports: [
    CommonModule,
    RouterModule,
    UiCommonModule
  ]
})
export class FeatureLibModule { }
