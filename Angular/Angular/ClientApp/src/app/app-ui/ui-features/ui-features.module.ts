import { FeatureHelpModule } from './feature-help/feature-help.module';
import { FeatureCatalogModule } from './feature-catalog/feature-catalog.module';
import { FeatureNavModule } from './feature-nav/feature-nav.module';
import { FeatureMarkModule } from './feature-mark/feature-mark.module';
import { FeatureLibModule } from './feature-lib/feature-lib.module';
import { FeatureBookModule } from './feature-book/feature-book.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatureBuilderModule } from './feature-builder/feature-builder.module';

@NgModule({
  declarations: [

  ],
  exports: [
    FeatureCatalogModule,
    FeatureBookModule,
    FeatureLibModule,
    FeatureMarkModule,
    FeatureNavModule,
    FeatureBuilderModule,
    FeatureHelpModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    FeatureHelpModule,
    FeatureCatalogModule,
    FeatureBookModule,
    FeatureLibModule,
    FeatureMarkModule,
    FeatureBuilderModule,
    FeatureNavModule
  ]
})
export class UiFeaturesModule { }
