import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCatalogComponent } from './feature-catalog.component';



@NgModule({
  declarations: [FeatureCatalogComponent],
  exports: [FeatureCatalogComponent],
  imports: [
    CommonModule
  ]
})
export class FeatureCatalogModule { }
