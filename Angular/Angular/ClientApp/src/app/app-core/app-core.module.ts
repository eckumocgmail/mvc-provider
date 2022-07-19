import { provider } from './mvc-provider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsHubService } from './reports-hub.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    ReportsHubService
  ]
})
export class AppCoreModule { }
