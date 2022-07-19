import { ToogleComponent } from './toogle.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ToogleComponent],
  exports: [ToogleComponent],
  bootstrap: [ToogleComponent],
  imports: [
    CommonModule
  ]
})
export class ToogleModule { }
