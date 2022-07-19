import { CollectionGridComponent } from './collection-grid/collection-grid.component';
import { CollectionTreeComponent } from './collection-tree/collection-tree.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionTableComponent } from './collection-table/collection-table.component';
import { Component, Input } from "@angular/core";

@Component({
  selector: 'switch-collection',
  template: `<control-switch [type]="type" [components]="collections"></control-switch>`
})
export class SwitchCollectionComponent
{
  @Input()
  type: string = 'CollectionListComponent';

  @Input()
  dataset: any;

  collections = [
    CollectionTableComponent,
    CollectionGridComponent,
    CollectionListComponent,
    CollectionTreeComponent
  ]

  constructor(){
    const ctrl = this;
    setTimeout(()=>{ ctrl.type='CollectionTreeComponent'; },1000);
  }
}
