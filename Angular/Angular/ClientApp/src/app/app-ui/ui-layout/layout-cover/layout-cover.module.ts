import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutCoverComponent } from './layout-cover.component';
import { RouterModule } from '@angular/router';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';



@NgModule({
  declarations: [LayoutCoverComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LayoutCoverComponent]
})
export class LayoutCoverModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

