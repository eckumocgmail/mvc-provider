import { PublicOverflowDirective } from './public-overflow/public-overflow.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  exports: [PublicOverflowDirective ],
  declarations: [PublicOverflowDirective ],
  imports: [
    CommonModule
  ]
})
export class LayoutPublicModule { }
