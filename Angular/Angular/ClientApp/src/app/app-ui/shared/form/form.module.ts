import { EmailModule } from './email/email.module';
import { PhoneModule } from './phone/phone.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { SelectboxModule } from './selectbox/selectbox.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { ButtonModule } from './button/button.module';



@NgModule({
  declarations: [FormComponent],
  exports: [FormComponent,
    ButtonModule,
    CheckboxModule,
    SelectboxModule,
    PhoneModule,
    EmailModule
  ],
  bootstrap: [FormComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    SelectboxModule,
    PhoneModule,
    EmailModule
  ]
})
export class FormModule { }
