import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { UiContextMenuComponent } from './ui-context-menu.component';
import { ContextMenuModule } from './context-menu/context-menu.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [UiContextMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    ContextMenuModule
  ],
  exports: [UiContextMenuComponent,ContextMenuModule]
})
export class UiContextMenuModule { }
