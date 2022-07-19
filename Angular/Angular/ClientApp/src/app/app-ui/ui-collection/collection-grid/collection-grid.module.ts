import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionGridComponent } from './collection-grid.component';



@NgModule({
  declarations: [CollectionGridComponent],
  bootstrap: [CollectionGridComponent],
  exports: [CollectionGridComponent],
  imports: [
    CommonModule
  ]
})
export class CollectionGridModule { }
