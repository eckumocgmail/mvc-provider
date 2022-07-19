
import { ElementRef, ViewChild, SimpleChanges, OnInit, OnChanges, Component, Injector, ViewContainerRef } from '@angular/core';
import { ChartService } from './chart.service';
import { inputTypes } from '../ui-forms/input-form/annotations/input-types.const';
import { controlTypes } from '../ui-forms/input-form/annotations/control-types.const';
import { validators } from '../ui-forms/input-form/annotations/validators.const';
import { structureTypes } from '../ui-forms/input-form/annotations/structure-types.const';

import { specification } from 'src/app/app-ui/ui-common/specification.function';



export class SeriesDataPoint {

  // @inputTypes.text()
  name = 'data point';

  // @structureTypes.arrayOfPrimitive(1)
  data: number[] = [1, 2, 3];
}



@specification({
  icon: 'insert_chart',
  label: 'Chart component',
  tooltip: 'a'
})
@Component({
  selector: 'chart',
  template: '<div #node style="width: 100%; height: 100%;"></div>',
  inputs: ['title',
           'type',
           'series',
           'xAxisTitle' ,
           'xAxisValues',
           'yAxisTitle',
           'yAxisValues',
 ]
})
export class ChartsComponent {

  constructor(  private injector: Injector,
                protected container: ViewContainerRef,
                private charts: ChartService  ) {
  }


  @ViewChild('node', { static: true }) node: ElementRef;


  @controlTypes.selectbox([ 'area', 'pie', 'line', 'bar', 'spline', 'column' ])
  type = 'area';

  @validators.required(true)
  @validators.minLength(5)
  title = 'column chart';

  @validators.required(true)
  @inputTypes.text()
  public xAxisTitle = '';
  @validators.required(true)
  //@structureTypes.arrayOfPrimitive('label')
  public xAxisValues: string[] = [];
  @validators.required(true)
  @inputTypes.text()
  public yAxisTitle = '';
  @validators.required(true)
  //@structureTypes.arrayOfPrimitive('label')
  public yAxisValues: string[] = [];



  @structureTypes.array(new SeriesDataPoint())
   series: any[] = [
    { name: 'Subject 1', data: [130, 422, 123, 232]},
    { name: 'Subject 2', data: [230, 420, 523, 432]},
    { name: 'Subject 3', data: [130, 320, 123, 432]},
  ];


  public credits: any = {
    enabled: false
  };

  public tooltip: any = {
    formatter: function() {
      return 'x: ' + this.charts.dateFormat('%e %b %y %H:%M:%S', this.x) +
        ' y: ' + this.y.toFixed(2);
    }
  };

  public xAxis: any = {

    labels: {

      formatter: function() {
        return this.charts.dateFormat('%e %b %y', this.value);
      }
    }
  };


  ngOnInit() {
    // super.ngOnInit();
    this.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    // super.ngOnChanges( changes );
    console.log( 'changes', this );
    this.update();
  }
  protected getInjector():  Injector {
    return this.injector;
  }

  update() {
    const options = new Object({


      chart: { type: this.type},
      title: { text: this.title },
      credits: this.credits,
      tooltip: this.tooltip,
      xAxis:    {
        // title: this.xAxisTitle,
        text: this.xAxisTitle,
      },
      yAxis:    {
        title: this.yAxisTitle,
        categories: this.yAxisValues
        // label: this.yAxisValues
      },
      series: this.series
      /*series: [{
          name: 'Year 1800',
          data: [107, 31, 635, 203, 2]
      }, {
          name: 'Year 1900',
          data: [133, 156, 947, 408, 6]
      }, {
          name: 'Year 2008',
          data: [973, 914, 4054, 732, 34]
      }]*/
    });

    if (!this.node) {

        console.error('chartElement undefined in StructureChartComponent');
    } else {
        const widget = this.charts.chart(this.node.nativeElement, options);
    }
  }
}
