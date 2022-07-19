import { ElementRef, ViewChild, SimpleChanges, OnInit, OnChanges, Component } from '@angular/core';
import { ChartService } from './chart.service';

import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
  icon: 'insert_chart',
  label: 'Chart component',
  tooltip: 'a'
})
@Component({
  selector: 'column-chart',
  template: '<div #node style="width: 100%; height: 100%;"></div>',
  inputs: ['title',

           'series'
 ]
})
export class ColumnChartComponent implements OnInit {
  @ViewChild('node', {static: true} ) node: ElementRef;
  //  @controlTypes.selectbox([ "area","pie","line","bar","spline","column" ])
  type = 'column';
  //  @validators.required(true)
  //  @validators.minLength(5)
  title = 'column chart';

  series: any[] = [
    { name: 'Subject 1', data: [130, 422, 123, 232]},
    { name: 'Subject 2', data: [230, 420, 523, 432]},
    { name: 'Subject 3', data: [130, 320, 123, 432]},
  ];
  constructor(   private charts: ChartService ) {
  }
  ngOnInit() {
    this.update();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.update();
  }
  update() {
    const options = new Object({
      chart: { type: this.type},
      title: { text: this.title },
      series: this.series
    });

    if ( !this.node ) {
        console.error('chartElement undefined in StructureChartComponent');
    } else {
        const widget = this.charts.chart(this.node.nativeElement, options);
    }
  }
}
