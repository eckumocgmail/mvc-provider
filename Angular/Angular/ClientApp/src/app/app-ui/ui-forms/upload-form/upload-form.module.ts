import { UploadFormComponent } from './upload-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations:[
    UploadFormComponent
  ],
  exports:[
    CommonModule,
    UploadFormComponent
  ],
})
export class UploadFormModule
{

}
