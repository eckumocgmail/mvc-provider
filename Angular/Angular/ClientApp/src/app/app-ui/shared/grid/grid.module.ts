import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';



@NgModule({
  declarations: [GridComponent],
  exports: [GridComponent],
  bootstrap: [GridComponent],
  imports: [
    CommonModule
  ]
})
export class GridModule { }
