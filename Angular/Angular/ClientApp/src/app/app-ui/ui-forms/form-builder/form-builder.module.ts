import { FormBuilderComponent } from './form-builder.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations:[
    FormBuilderComponent
  ],
  exports:[
    CommonModule,
    FormBuilderComponent
  ],
})
export class UploadFormModule
{

}
