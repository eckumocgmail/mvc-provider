import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBadgedComponent } from './nav-badged.component';



@NgModule({
  declarations: [NavBadgedComponent],
  bootstrap: [NavBadgedComponent],
  exports: [NavBadgedComponent],
  imports: [
    CommonModule
  ]
})
export class NavBadgedModule { }
