import { UploadFormComponent } from './upload-form/upload-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InputFormService } from './input-form/input-form.service';
import { InputFormComponent } from './input-form/input-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCoreService } from 'src/app/app-ui/ui-common/app-core.service';
import { InputFormValidator } from './input-form/input-form-validator.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { InputFormsModule } from './input-form/input-forms.module';
import { FormInputModule } from './form-input/form-input.module';



@NgModule({
  declarations: [
    UploadFormComponent
  ],
  exports: [
    InputFormsModule,
    FormInputModule
  ],
  providers: [

  ],
  imports: [
    CommonModule,
    FormInputModule,
    ReactiveFormsModule,
    InputFormsModule


  ]
})
export class UiFormsModule
extends AppCoreService
{
  constructor(){
    super( arguments );
  }
}

