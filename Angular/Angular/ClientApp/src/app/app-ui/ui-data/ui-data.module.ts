import { DataSourcesComponent } from './data-sources.component';
import { DataListModule } from './data-list/data-list.module';

import { UiFormsModule } from './../ui-forms/ui-forms.module';
import { UiCollectionModule } from './../ui-collection/ui-collection.module';
import { UiLayoutModule } from './../ui-layout/ui-layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiFeaturesModule } from '../ui-features/ui-features.module';
import { DataTableModule } from './data-table/data-table.module';
import { DataReportComponent } from './data-report.component';
import { OdbcDataSourceComponent } from './odbc-data-source.component';



@NgModule({
  declarations: [DataSourcesComponent,OdbcDataSourceComponent,DataReportComponent],
  bootstrap: [DataSourcesComponent,OdbcDataSourceComponent,DataReportComponent],
  imports: [
    CommonModule,
    UiLayoutModule,
    UiCollectionModule,
    UiFormsModule,
    UiFeaturesModule,
    DataTableModule,

    DataListModule

  ],
  exports: [
    DataSourcesComponent,
    OdbcDataSourceComponent,
    DataReportComponent,
    DataListModule,
    DataTableModule
  ]
})
export class UiDataModule { }
