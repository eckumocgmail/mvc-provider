import { FormControlComponent } from './form-control.component';
import { Injectable } from "@angular/core";
import { FormFieldComponent } from './form-field.component';
import { FormValidationService } from './form-validation.service';

@Injectable()
export class FormControlService
{
  createTextAreaControl(options: { name: string, label?: string, help?: string, icon?: string }): any {
    const control = new FormControlComponent();

    control.name = options.name;
    control.label = options.label||options.name;
    control.help = options.help;
    control.icon = options.icon;
    control.type = 'text';
    control.control = { type: 'textarea' };
    return control;
  }
  createCheckboxControl(options: { name: string, label?: string, help?: string, icon?: string }): any {
    const control = new FormControlComponent();

    control.name = options.name;
    control.label = options.label||options.name;
    control.help = options.help;
    control.icon = options.icon;
    control.type = 'text';
    control.control = { type: 'checkbox' };
    return control;
  }
  createRadioGroupControl(options: { name: string, options: { text: string; value: string; }[], label?: string, help?: string, icon?: string }): any {
    const control = new FormControlComponent();

    control.name = options.name;
    control.label = options.label||options.name;
    control.help = options.help;
    control.icon = options.icon;
    control.type = 'text';
    control.control = { type: 'radiogroup', options: options.options };
    return control;
  }
  createSelectboxControl(options: { name: string, options: { text: string; value: string; }[], label?: string, help?: string, icon?: string }): any {
    const control = new FormControlComponent();

    control.name = options.name;
    control.label = options.label||options.name;
    control.help = options.help;
    control.icon = options.icon;
    control.type = 'text';
    control.control = { type: 'selectbox', options: options.options };
    return control;
  }
  constructor(private validation: FormValidationService){
  }

}
