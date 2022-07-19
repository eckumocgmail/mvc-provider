import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutColumnsComponent } from './layout-columns.component';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';


@NgModule({
  declarations: [LayoutColumnsComponent],
  exports: [LayoutColumnsComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutColumnsModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

