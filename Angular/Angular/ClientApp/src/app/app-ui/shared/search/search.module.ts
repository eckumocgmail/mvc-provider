import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';


@NgModule({
  declarations: [SearchComponent],
  exports: [SearchComponent],
  bootstrap: [SearchComponent],
  imports: [
    CommonModule
  ]
})
export class SearchModule { }
