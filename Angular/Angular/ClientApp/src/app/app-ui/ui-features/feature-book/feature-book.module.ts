import { UiCollectionModule } from './../../ui-collection/ui-collection.module';
import { UiCommonModule } from './../../ui-common/ui-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureBookComponent } from './feature-book.component';
import { FeatureDepsModule } from '../feature-deps.module';
import { UiControlModule } from '../../ui-control/ui-control.module';



@NgModule({
  declarations: [FeatureBookComponent],
  exports: [FeatureBookComponent],
  imports: [
    CommonModule,
    UiCollectionModule,
    UiControlModule
  ]
})
export class FeatureBookModule { }
