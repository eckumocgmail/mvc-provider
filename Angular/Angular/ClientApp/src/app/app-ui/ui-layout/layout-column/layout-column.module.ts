import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutColumnComponent } from './layout-column.component';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';


@NgModule({
  bootstrap: [LayoutColumnComponent],
  declarations: [LayoutColumnComponent],
  exports: [LayoutColumnComponent],
  imports: [
    CommonModule
  ]
})
export class LayoutColumnModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

