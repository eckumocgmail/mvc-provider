import { ReportCardComponent } from './report-card.component';
import { CommonModule } from '@angular/common';
import { NavigationCardComponent } from './navigation-card.component';
import { PersonCardComponent } from './person-card.component';
import { NgModule } from "@angular/core";
import { AppUiModule } from 'src/app/app-ui/app-ui.module';

@NgModule({
  declarations:[
    PersonCardComponent,
    NavigationCardComponent,
    ReportCardComponent
  ],
  imports: [
    CommonModule,
    AppUiModule
  ],
  exports: [
    PersonCardComponent,
    NavigationCardComponent,
    ReportCardComponent
  ]
})
export class DataPagesModule
{

}
