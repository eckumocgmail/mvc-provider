import { ElementRef, ViewChild, SimpleChanges, OnInit, OnChanges, Component } from '@angular/core';
import { ChartService } from './chart.service';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
  icon: 'insert_chart',
  label: 'Chart component',
  tooltip: 'a'
})
@Component({
  selector: 'line-chart',
  template: '<div #node style="width: 100%; height: 100%;"></div>',
  inputs: ['title',
           'type',
           'series'
 ]
})
export class LineChartComponent implements OnInit, OnChanges {

    @ViewChild('node', {static: true} ) node: ElementRef;
    title = 'Line chart';
    series = [{
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
    }];

    constructor( private charts: ChartService ) {
    }

    ngOnInit() {
        this.update();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.update();
    }

    update() {
        const options = new Object({
            series: this.series,
            title: { text: this.title }
        });
        if ( !this.node ) {
            console.error('chartElement undefined in StructureChartComponent');
        } else {
            this.charts.chart(this.node.nativeElement, options);
        }
    }
}



