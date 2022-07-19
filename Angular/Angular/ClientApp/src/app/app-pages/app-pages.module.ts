import { JitComponent } from './app-jit.component';
import { AppIndexComponent } from './app-index.component';
import { AppReportComponent } from './app-report.component';
import { AuthorizationModule } from './pages-auth/authorization.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPagesRoutingModule } from './app-pages-routing.module';
import { PagesDeveloperModule } from './pages-developer/pages-developer.module';
import { AppUiModule } from '../app-ui/app-ui.module';
import { DataPagesModule } from './data-pages.module';


@NgModule({
  declarations: [
    AppReportComponent,
    AppIndexComponent,
    JitComponent
  ],
  imports: [
    CommonModule,
    AppPagesRoutingModule,
    AuthorizationModule,
    PagesDeveloperModule,
    AppUiModule,
    DataPagesModule
  ],
  exports: [
    JitComponent,
    AppPagesRoutingModule,
    AuthorizationModule,
    PagesDeveloperModule,
    DataPagesModule,
    AppReportComponent
  ]
})
export class AppPagesModule { }
