import { TabsComponent } from './tabs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [TabsComponent],
  exports: [TabsComponent],
  bootstrap: [TabsComponent],
  imports: [
    CommonModule
  ]
})
export class TabsModule { }
