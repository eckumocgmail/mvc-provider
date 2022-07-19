import { SvgPaneComponent } from './svg-pane.component';
import { MapModule } from './svg-map/map.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';


@NgModule({
  declarations: [SvgPaneComponent],
  imports: [
    CommonModule,
    RouterModule,
    MapModule
  ],
  exports: [
    SvgPaneComponent,
    MapModule
  ]
})
export class UiSvgModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

