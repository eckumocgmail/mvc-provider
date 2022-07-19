import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutLayersComponent } from './layout-layers.component';
import { RouterModule } from '@angular/router';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';



@NgModule({
  declarations: [LayoutLayersComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LayoutLayersComponent]
})
export class LayoutLayersModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

