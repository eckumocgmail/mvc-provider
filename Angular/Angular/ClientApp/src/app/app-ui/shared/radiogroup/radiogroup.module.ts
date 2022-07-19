import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadiogroupComponent } from './radiogroup.component';
import { ToogleModule } from './toogle/toogle.module';



@NgModule({
  declarations: [RadiogroupComponent],
  exports: [
    RadiogroupComponent,
    ToogleModule
  ],
  bootstrap: [RadiogroupComponent],
  imports: [
    CommonModule,
    ToogleModule
  ]
})
export class RadiogroupModule { }
