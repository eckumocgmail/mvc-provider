import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilderComponent } from './feature-builder.component';
import { MatIconModule } from '@angular/material/icon';
import { UiCommonModule } from './../../ui-common/ui-common.module';
import { UiLayoutModule } from './../../ui-layout/ui-layout.module';
import { UiFormsModule } from './../../ui-forms/ui-forms.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureDepsModule } from '../feature-deps.module';
import { UiCollectionModule } from '../../ui-collection/ui-collection.module';
import { UiControlModule } from '../../ui-control/ui-control.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';



@NgModule({
  exports: [
    FormBuilderComponent
  ],
  declarations: [
    FormBuilderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTooltipModule,
    UiCommonModule,
    UiLayoutModule,
    UiControlModule,
    UiFormsModule,
    UiCollectionModule
  ]
})
export class FeatureBuilderModule { }
