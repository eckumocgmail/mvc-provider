import { FormControlService } from './form-control.service';
import { FormFieldService } from './form-field.service';

import { OnInit } from "@angular/core";
import { Component } from "@angular/core";

@Component({
  selector: 'form-person',
  template: `
    <form-view [title]="title" [fields]="fields" (changed)="person=$event"></form-view>
  `
})
export class FormPersonComponent
implements OnInit
{

  title = 'Person';
  fields = [];
  person = {};

  constructor(private $field: FormFieldService,private $control: FormControlService){

  }


  ngOnInit(): void {
    this.fields.push(this.$field.createEngField({ name: 'Name', error: 'Please input firstname in english'}));
    this.fields.push(this.$field.createEngField({ name: 'Surname', error: 'Please input surname in english'}));
    this.fields.push(this.$field.createEngField({ name: 'Patronymic', error: 'Please input patronymic in english'}));
    this.fields.push(this.$field.createDateField({ name: 'Birthday' }));
    this.fields.push(this.$control.createCheckboxControl({ name: 'Confirmed' }));
    this.fields.push(this.$control.createSelectboxControl({ name: 'Sex', options: [{ text: 'woman', value: 'w' },{ text: 'man', value: 'm' }] }));
    //FormControlComponent
  }
}
