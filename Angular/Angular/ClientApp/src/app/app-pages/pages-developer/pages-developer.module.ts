import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeveloperComponent } from './developer-database/developer.component';
import { AppUiModule } from 'src/app/app-ui/app-ui.module';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'src/app/app-ui/shared/shared.module';
import { DeveloperFormsComponent } from './developer-forms/developer-forms.component';
import { FormPaneComponent } from './developer-forms/form-pane/form-pane.component';



@NgModule({
  declarations: [DeveloperComponent, DeveloperFormsComponent, FormPaneComponent ],
  imports: [
    RouterModule,
    CommonModule,
    AppUiModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    SharedModule
  ],
  exports:[

  ]
})
export class PagesDeveloperModule { }
