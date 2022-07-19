import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionTreeComponent } from './collection-tree.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  bootstrap: [CollectionTreeComponent],
  declarations: [CollectionTreeComponent],
  exports: [CollectionTreeComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CollectionTreeModule { }
