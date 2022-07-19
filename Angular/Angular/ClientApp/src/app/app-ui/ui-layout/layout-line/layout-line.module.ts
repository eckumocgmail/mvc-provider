import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutLineComponent } from './layout-line.component';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutSideComponent } from '../layout-side.component';



@NgModule({
  declarations: [LayoutLineComponent],
  exports: [LayoutLineComponent],
  imports: [
    CommonModule,
    MatSidenavModule
  ]
})
export class LayoutLineModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

