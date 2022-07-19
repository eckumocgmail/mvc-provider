import { FormFieldService } from './form-field.service';
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FormFieldComponent } from "./form-field.component";

@Component({
  selector: 'form-account',
  template: `
    <form-view [title]="title" [fields]="fields" (changed)="account=$event"></form-view>
  `
})
export class FormAccountComponent
implements OnInit
{
  title = 'Login';
  fields: FormFieldComponent[] = [
  ];
  account={};

  constructor(private service: FormFieldService){

  }

  ngOnInit(): void {
    const ctrl = this;
    ctrl.fields.push(ctrl.service.createEmailField({name: 'username'}));
    ctrl.fields.push(ctrl.service.createPasswordField({name: 'password'}));
    ctrl.fields.push(ctrl.service.createPasswordConfirmationField({ fieldName: 'confirmation',passwordField: 'password'}));
  }

}
