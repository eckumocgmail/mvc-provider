import { FeatureHelpService } from './feature-help.service';

import { provider } from './../../../app-core/mvc-provider';
import { UiLayoutModule } from './../../ui-layout/ui-layout.module';
import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureHelpComponent } from './feature-help.component';
import { Help } from '../../ui-forms/input-form/annotations/asp-types.const';
import { Router } from '@angular/router';

@NgModule({
  declarations: [FeatureHelpComponent],
  exports: [FeatureHelpComponent],
  imports: [
    CommonModule,
    UiLayoutModule
  ],
  providers: [
    FeatureHelpService
  ]
})
export class FeatureHelpModule {

  constructor( private service: FeatureHelpService ){
  }

} 
