import { CollectionTreeModule } from './../../ui-collection/collection-tree/collection-tree.module';
import { FeatureNavComponent } from './feature-nav.component';
import { UiCommonModule } from '../../ui-common/ui-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FeatureNavComponent],
  exports: [
    FeatureNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UiCommonModule,
    CollectionTreeModule
  ]
})
export class FeatureNavModule { }
