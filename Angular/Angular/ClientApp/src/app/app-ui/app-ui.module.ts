import { JitComponent } from '../app-pages/app-jit.component';
import { UiCollectionModule } from './ui-collection/ui-collection.module';
import { UiChartsModule } from './ui-charts/ui-charts.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiLayoutModule } from './ui-layout/ui-layout.module';
import { UiControlModule } from './ui-control/ui-control.module';
import { UiFormsModule } from './ui-forms/ui-forms.module';
import { UiSvgModule } from './ui-svg/ui-svg.module';

import { UiDialogModule } from './ui-dialog/ui-dialog.module';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';
import { UiContextMenuModule } from './ui-context/ui-context-menu.module';
import { UiContentPipe } from './ui-content.pipe';
import { UiTabIndexDirective } from './ui-tabindex.directive';
import { UiTextDirective } from './ui-text.directive';
import { UiDivDirective } from './ui-div.directive';
import { UiFeaturesModule } from './ui-features/ui-features.module';
import { UiIFrameComponent } from './ui-iframe.component';
import { UiDataModule } from './ui-data/ui-data.module';

@NgModule({
  declarations: [
    UiContentPipe,
    UiTabIndexDirective,
    UiTextDirective,
    UiDivDirective,
    UiIFrameComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UiDataModule,
    UiLayoutModule,
    UiControlModule,
    UiFormsModule,
    UiSvgModule,
    UiCollectionModule,
    UiChartsModule,
    UiDialogModule,
    UiFormsModule,
    UiContextMenuModule,
    UiFeaturesModule,
    UiControlModule,
    UiChartsModule,
    UiSvgModule
  ],
  exports: [

    UiDataModule,
    UiLayoutModule,
    UiControlModule,
    UiFormsModule,
    UiCollectionModule,
    UiSvgModule,
    UiChartsModule,
    UiDialogModule,
    UiFormsModule,
    UiControlModule,
    UiContextMenuModule,
    UiSvgModule,
    UiFeaturesModule,
    UiChartsModule,
    UiContentPipe,
    UiTabIndexDirective,
    UiTextDirective,
    UiDivDirective,
    UiIFrameComponent
  ]
})
export class AppUiModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

