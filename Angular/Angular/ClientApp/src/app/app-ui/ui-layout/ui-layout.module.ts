import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutSideComponent } from './layout-side.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutOutletComponent } from './layout-outlet.component';
import { LayoutShowDirective } from './layout-show.directive';
import { LayoutFitDirective } from './layout-fit.directive';
import { MatExpansionModule } from '@angular/material/expansion';


import { LayoutPaneModule } from './layout-pane/layout-pane.module';
import { LayoutCoverModule } from './layout-cover/layout-cover.module';
import { LayoutLayersModule } from './layout-layers/layout-layers.module';
import { LayoutLineModule } from './layout-line/layout-line.module';
import { LayoutColumnModule } from './layout-column/layout-column.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiLayoutComponent } from './ui-layout.component';
import { LayoutColumnsModule } from './layout-columns/layout-columns.module';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';
import { LayoutPublicModule } from './layout-public/layout-public.module';
import { LayoutOverflowDirective } from './layout-overflow.directive';
import { LayoutDropdownModule } from './layout-dropdown/layout-dropdown.module';
import { LayoutCardModule } from './layout-card/layout-card.module';
import { LayoutDialogComponent } from './layout-dialog.component';


@NgModule({
  declarations: [
    LayoutSideComponent,
    LayoutShowDirective,
    LayoutOverflowDirective,
    LayoutFitDirective,
    LayoutDialogComponent,
    LayoutOutletComponent,
    UiLayoutComponent
  ],
  imports: [
    CommonModule,

    MatIconModule,
    MatButtonModule,
    MatToolbarModule,

    LayoutCardModule,
    LayoutDropdownModule,
    LayoutColumnModule,
    LayoutLineModule,
    LayoutLayersModule,
    LayoutCoverModule,
    LayoutPaneModule,
    LayoutColumnsModule,
    LayoutPublicModule,

    MatExpansionModule,
    MatSidenavModule

  ],
  exports: [
    LayoutDropdownModule,
    LayoutOutletComponent,
    LayoutSideComponent,
    LayoutColumnModule,
    LayoutLineModule,
    LayoutLayersModule,
    LayoutCoverModule,
    LayoutPaneModule,
    LayoutColumnsModule,
    LayoutPublicModule,
    LayoutCardModule,
    LayoutDialogComponent,
    UiLayoutComponent,
    LayoutFitDirective,
    LayoutShowDirective,
    LayoutOverflowDirective
  ]
})
export class UiLayoutModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

