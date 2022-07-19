import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectboxComponent } from './selectbox.component';



@NgModule({
  bootstrap: [SelectboxComponent],
  declarations: [SelectboxComponent],
  exports: [SelectboxComponent],
  imports: [
    CommonModule
  ]
})
export class SelectboxModule { }
