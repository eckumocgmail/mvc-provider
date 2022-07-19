import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';

@NgModule({
  exports: [CardComponent],
  declarations: [CardComponent],
  bootstrap: [CardComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CardModule { }
