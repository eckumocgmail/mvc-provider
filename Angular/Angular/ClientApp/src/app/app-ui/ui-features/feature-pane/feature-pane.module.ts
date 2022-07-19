import { FeatureNavComponent } from '../feature-nav/feature-nav.component';
import { UiCommonModule } from '../../ui-common/ui-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeaturePaneComponent } from './feature-pane.component';

@NgModule({
  declarations: [FeaturePaneComponent],
  exports: [
    FeaturePaneComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UiCommonModule
  ]
})
export class FeaturePaneModule { }
