import { MatButtonModule } from '@angular/material/button';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';
import { LayoutDropDownComponent } from './layout-dropdown.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';



@NgModule({

  declarations: [LayoutDropDownComponent],
  exports: [LayoutDropDownComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class LayoutDropdownModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

