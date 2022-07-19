import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CollectionTreeModule } from './collection-tree/collection-tree.module';
import { CollectionListModule } from './collection-list/collection-list.module';
import { CollectionGridModule } from './collection-grid/collection-grid.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionTableModule } from './collection-table/collection-table.module';
import { CollectionSelectComponent } from './collection-select.component';
import { SwitchCollectionComponent } from './switch-collection.component';
import { UiControlModule } from '../ui-control/ui-control.module';



@NgModule({
  declarations: [ CollectionSelectComponent,SwitchCollectionComponent],
  bootstrap: [ CollectionSelectComponent,SwitchCollectionComponent],
  imports: [
    CommonModule,
    UiControlModule,
    CollectionGridModule,
    CollectionListModule,
    CollectionTreeModule,
    CollectionTableModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  exports: [
    SwitchCollectionComponent,
    CollectionGridModule,
    CollectionListModule,
    CollectionTreeModule,
    CollectionTableModule,
    CollectionSelectComponent
  ]
})
export class UiCollectionModule { }
