import { UiLayoutModule } from './../../ui-layout/ui-layout.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionListComponent } from './collection-list.component';



@NgModule({
  declarations: [CollectionListComponent],
  exports: [CollectionListComponent],
  imports: [
    CommonModule,
    UiLayoutModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CollectionListModule { }
