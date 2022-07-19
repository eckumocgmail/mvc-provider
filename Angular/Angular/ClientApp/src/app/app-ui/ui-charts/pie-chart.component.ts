import { ElementRef, ViewChild, SimpleChanges, OnInit, OnChanges, Component, Injector, ViewContainerRef } from '@angular/core';
import { ChartService } from './chart.service';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
  icon: 'insert_chart',
  label: 'Chart component',
  tooltip: 'a'
})
@Component({
  selector: 'pie-chart',
  template: '<div #node style="width: 100%; height: 100%;"></div>',
  inputs: ['title',
           'type',
           'series'
  ]
})
export class PieChartComponent implements OnInit {
  @ViewChild('node', {static: true} ) node: ElementRef;
  //  @controlTypes.selectbox([ "area","pie","line","bar","spline","column" ])
  type = 'pie';
  //  @validators.required(true)
  //  @validators.minLength(5)
  title = 'column chart';
  series: any[] = [{
    name: 'Brands',
    colorByPoint: true,
    data: [{
        name: 'Sogou Explorer',
        y: 1.64
    }, {
        name: 'Opera',
        y: 1.6
    }, {
        name: 'QQ',
        y: 1.2
    }, {
        name: 'Other',
        y: 2.61
    }]
  }];
  constructor(  private injector: Injector,
                protected container: ViewContainerRef,
                private charts: ChartService  ) {
  }
  ngOnInit() {
    this.update();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.update();
  }
  update() {
    const options = new Object({
        chart: { type: this.type },
        title: { text: this.title },
        series: this.series
    });
    if ( !this.node ) {
        console.error('chartElement undefined in StructureChartComponent');
    } else {
      this.charts.chart(this.node.nativeElement, options);
    }
  }
}



