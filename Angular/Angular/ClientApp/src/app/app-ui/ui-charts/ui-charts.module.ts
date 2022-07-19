import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaChartComponent } from './area-chart.component';
import { ChartsComponent } from './charts.component';
import { PieChartComponent } from './pie-chart.component';
import { ColumnChartComponent } from './column-chart.component';
import { LineChartComponent } from './line-chart.component';
import { UiChartsComponent } from './ui-charts.component';
import { ChartService } from './chart.service';
import { BarChartComponent } from './bar-chart.component';


@NgModule({
  declarations: [
    UiChartsComponent,

    ChartsComponent,
    PieChartComponent,
    LineChartComponent,
    ColumnChartComponent,
    PieChartComponent,
    BarChartComponent,
    AreaChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UiChartsComponent,

    ChartsComponent,
    PieChartComponent,
    LineChartComponent,
    ColumnChartComponent,
    PieChartComponent,
    BarChartComponent,
    AreaChartComponent
  ],
  providers:[
    ChartService
  ]
})
export class UiChartsModule
{

}
