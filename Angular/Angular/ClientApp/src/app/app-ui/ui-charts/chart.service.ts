import { Injectable} from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

/**
 * Выполняет скрипт библиотеки highcharts
 */
@Injectable()
export class ChartService {


  chart(nativeElement: any, options: Object) {
    console.log(options);
    return Highcharts.chart( nativeElement, options );
  }

  /**
   * @example
   * .coluimn( 'column chart',
        [
          { name: 'Subject 1', data: [130, 422, 123, 232]},
          { name: 'Subject 2', data: [230, 420, 523, 432]},
          { name: 'Subject 3', data: [130, 320, 123, 432]},
        ]
      );
   */
  column( title: string, series: Array<{ name: string, data: number[] }>) {
    return new Object({
      chart: { type: 'column'},
      title: { text: title },
      series: series
    });
  }

  /**
     * @example
     * .line(
          'Line chart',
          [{
                  name: 'Installation',
                  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
              }, {
                  name: 'Manufacturing',
                  data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
              }, {
                  name: 'Sales & Distribution',
                  data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
              }, {
                  name: 'Project Development',
                  data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
              }, {
                  name: 'Other',
                  data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
          }]
        );
     */
  line( title: string, series: Array<{ name: string, data: Array<number>}> ) {
      return new Object({
          series: series,
          title: { text: title }
      });
  }

  /**
   *
   * @param title
   * @param series
   * @example
   * .pie( 'brands',[{
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
      }])
   */
  pie( title: string, series: Array<{ name: string, y: number }>) {
    return new Object({
        chart: { type: 'pie' },
        title: { text: title },
        series: [{
          name: title,
          colorByPoint: true,
          data: series
        }]
    });
  }

}
