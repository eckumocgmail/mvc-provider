import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame.component';



@NgModule({
  declarations: [FrameComponent],
  exports: [FrameComponent],
  bootstrap: [FrameComponent],
  imports: [
    CommonModule
  ]
})
export class FrameModule { }
