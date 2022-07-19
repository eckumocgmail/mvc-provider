import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneComponent } from './phone.component';



@NgModule({
  declarations: [PhoneComponent],
  exports: [PhoneComponent],
  bootstrap: [PhoneComponent],
  imports: [
    CommonModule
  ]
})
export class PhoneModule { }
