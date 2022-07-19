import { FormControlService } from './form-control.service';
import { FormFieldService } from './form-field.service';
import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FormFieldComponent } from "./form-field.component";

@Component({
  selector: 'form-application',
  template: `<form-view [title]="title" [fields]="fields"></form-view>`
})
export class FormApplicationComponent
implements OnInit
{
  title = 'Application';
  fields: FormFieldComponent[] = [
  ];
  application = {};

  constructor(private service: FormFieldService,private controls: FormControlService){

  }

  ngOnInit(): void {
    const ctrl = this;
    this.fields.push(this.service.createUrlField({ name: 'url', error: 'enter a valid url' }));
    this.fields.push(this.controls.createTextAreaControl({ name: 'xml' }));
  }

}
