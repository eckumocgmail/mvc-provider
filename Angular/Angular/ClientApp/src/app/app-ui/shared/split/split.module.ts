import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitComponent } from './split.component';



@NgModule({
  declarations: [SplitComponent],
  exports: [SplitComponent],
  bootstrap: [SplitComponent],
  imports: [
    CommonModule
  ]
})
export class SplitModule { }
