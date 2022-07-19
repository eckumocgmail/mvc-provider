import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionTableComponent } from './collection-table.component';



@NgModule({
  declarations: [CollectionTableComponent],
  bootstrap: [CollectionTableComponent],
  exports: [CollectionTableComponent],
  imports: [
    CommonModule
  ]
})
export class CollectionTableModule { }
