import { Component, OnInit } from '@angular/core';
import { ChartsComponent } from './charts.component';

import { PieChartComponent } from './pie-chart.component';
import { ColumnChartComponent } from './column-chart.component';
import { LineChartComponent } from './line-chart.component';
import { BarChartComponent } from './bar-chart.component';
import { AreaChartComponent } from './area-chart.component';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'ui-charts',
  template: `
    <div>
      <h2> ui-charts </h2>
      <!-- <ui-radiogroup-element [options]="switch.types" [selected]="switch.type" (onChanged)="switch.type=$event;"></ui-radiogroup-element>
      <ui-selectbox-element [options]="switch.types" [selected]="switch.type" (onChanged)="switch.type=$event;"></ui-selectbox-element>
      <switch-component [components]="components" #switch></switch-component> -->
    </div>
  `,
  styles: [
  ]
})
export class UiChartsComponent implements OnInit {

  components = [
    ChartsComponent,

    LineChartComponent,
    ColumnChartComponent,
    PieChartComponent,
    BarChartComponent,
    AreaChartComponent
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
