import { SpinnerModule } from './spinner/spinner.module';
import { GridModule } from './grid/grid.module';
import { SplitModule } from './split/split.module';
import { FormModule } from './form/form.module';
import { SharedComponent } from './shared.component';
import { TableModule } from './table/table.module';
import { FormsModule } from '@angular/forms';
import { CardModule } from './card/card.module';
import { ProgressbarModule } from './progressbar/progressbar.module';

import { SearchModule } from './search/search.module';
import { RadiogroupModule } from './radiogroup/radiogroup.module';
import { PaginationModule } from './pagination/pagination.module';
import { NavModule } from './nav/nav.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from './modal/modal.module';
import { ToogleModule } from './radiogroup/toogle/toogle.module';
import { FrameModule } from './frame/frame.module';
import { TextModule } from './text/text.module';
import { ModalConfirmComponent } from './modal/modal-confirm.component';
import { TabsModule } from './tabs/tabs.module';
import { NavBadgedModule } from './nav-badged/nav-badged.module';


@NgModule({
  declarations:[
    SharedComponent
  ],
  imports: [
    CommonModule,
    FormModule,

    TabsModule,
    ModalModule,
    NavModule,
    NavBadgedModule,
    PaginationModule,
    RadiogroupModule,
    SearchModule,
    ProgressbarModule,
    CardModule,
    RadiogroupModule,
    NavModule,
    TableModule,
    FormsModule,

    SplitModule,
    TextModule,
    SplitModule,
    GridModule,
    SpinnerModule

  ],
  exports: [
    SharedComponent,
    GridModule,
    TabsModule,
    SpinnerModule,
    SplitModule,
    TextModule,
    TableModule,
    FormModule,
    NavModule,
    NavBadgedModule,
    RadiogroupModule,
    CardModule,
    GridModule,
    ProgressbarModule,
    ModalModule,
    NavModule,
    PaginationModule,
    RadiogroupModule,
    SearchModule
  ]
})
export class SharedModule { }
