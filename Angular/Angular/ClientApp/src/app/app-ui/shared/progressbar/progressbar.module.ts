import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarComponent } from './progressbar.component';



@NgModule({
  exports: [ProgressbarComponent],
  bootstrap: [ProgressbarComponent],
  declarations: [ProgressbarComponent],
  imports: [
    CommonModule
  ]
})
export class ProgressbarModule { }
