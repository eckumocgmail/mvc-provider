import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './email.component';



@NgModule({
  declarations: [EmailComponent],
  bootstrap: [EmailComponent],
  exports: [EmailComponent],
  imports: [
    CommonModule
  ]
})
export class EmailModule { }
