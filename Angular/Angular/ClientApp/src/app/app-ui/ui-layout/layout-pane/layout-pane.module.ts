import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPaneComponent } from './layout-pane.component';
import { RouterModule } from '@angular/router';

import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';
import { UiCommonModule } from '../../ui-common/ui-common.module';

@NgModule({
  declarations: [LayoutPaneComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LayoutPaneComponent]
})
export class LayoutPaneModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

