import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'feature-book',

  template: `
    <div>
      <ng-container *ngTemplateOutlet="defaults"></ng-container>
      <ng-template #defaults></ng-template>
      <control-pages></control-pages>
    </div>
  `,
  styles: [
  ]
})
export class FeatureBookComponent implements OnInit, OnChanges {

  @Input() items: any[] = [];
  @Input() page: number = 1;
  @Input() size: number = 10;
  @Input('view') p;
  options = {
    type: 'table',
    input: {
      columns: ['id'],
      dataset: [{id:1}]
    }
  };
  @Input() total: number = 10;


  constructor() { }


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.options.input);
  }


}

