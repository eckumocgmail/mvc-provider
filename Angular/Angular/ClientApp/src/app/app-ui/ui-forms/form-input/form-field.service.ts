import { Injectable } from "@angular/core";
import { FormFieldComponent } from './form-field.component';
import { FormValidationService } from './form-validation.service';

@Injectable()
export class FormFieldService
{

  constructor(private validation: FormValidationService){
  }


  createDateField( options: {name: string, help?: string, label?: string}, additional?: { icon?: string, required?: string }): any {
    const field = new FormFieldComponent();
    field.name = options.name;
    field.label = options.label||options.name;
    field.help = options.help;
    field.type = 'date';
    field.value = new Date();
    if( additional ){
      field.required = additional.required;
      field.icon = additional.icon;
    }
    return field;
  }
  createPhoneField(options: { name: string, error?: string, help?: string, label?: string }, additional?: { icon?: string, required?: string }): any {
    const field = new FormFieldComponent();
    field.name = options.name;
    field.label = options.label||options.name;
    field.help = options.help;
    field.type = 'text';

    if( additional ){
      field.required = additional.required;
      field.icon = additional.icon;
    }
    field.transform = function( phone: string ){

      let value = '';
      for( let i=0; i<phone.length; i++ ){
        if( "0123456789".indexOf(phone[i]) !== -1 ){
          value += phone[i];
        }
        if( value.length == 11 ){
          break;
        }
      }

      if( value.length>0 ) value = value.substr(0,1)+'-'+value.substring(1);
      if( value.length>4 ) value = value.substr(0,5)+'-'+value.substring(5);
      if( value.length>8 ) value = value.substr(0,9)+'-'+value.substring(9);
      if( field.value.length > phone.length && value.endsWith('-') ){
        value = value.substr(0,value.length-1);
      }
      return value;
    }
    field.validators.push(this.validation.createPhoneValidator(options.error||'enter a valid phone number in format X-XXX-XXX-XXXX'));
    return field;
  }
  createUrlField(options: { name: string, error?: string, help?: string, label?: string }, additional?: { icon?: string, required?: string }): FormFieldComponent {
    const field = new FormFieldComponent();
    field.name = options.name;
    field.label = options.label||options.name;
    field.help = options.help;
    field.type = 'text';
    if( additional ){
      field.required = additional.required;
      field.icon = additional.icon;
    }
    field.validators.push(this.validation.createUrlValidator(options.error||'enter a valid url'));
    return field;
  }
  createPasswordField( options: {name: string, help?: string, label?: string}, additional?: { icon?: string, required?: string }): any {
    const field = new FormFieldComponent();
    field.name = options.name;
    field.label = options.label||options.name;
    field.help = options.help;
    field.type = 'password';
    if( additional ){
      field.required = additional.required;
      field.icon = additional.icon;
    }
    return field;
  }
  createPasswordConfirmationField( options: {fieldName: string, passwordField: string, errorMessage?: string, helpMessage?: string, labelText?: string }, additional?: { icon?: string, required?: string }): any {
    const field = new FormFieldComponent();
    field.name = options.fieldName;
    field.label = options.labelText || options.fieldName;
    field.help = options.helpMessage;
    field.type = 'password';
    if( additional ){
      field.required = additional.required;
      field.icon = additional.icon;
    }
    field.validators.push(this.validation.createPasswordConfirmationValidator(options.passwordField,options.errorMessage||'confirmation not equals password'));
    return field;
  }
  createEmailField(options: {name: string, error?: string, help?: string, label?: string}, additional?: { icon?: string, required?: string }): any {
    const field = new FormFieldComponent();
    field.name = options.name;
    field.label = options.label||options.name;
    field.help = options.help;
    field.type = 'text';
    if( additional ){
      field.required = additional.required;
      field.icon = additional.icon;
    }
    field.validators.push(this.validation.createEmailValidator(options.error||'email address incorrect'));
    return field;
  }
  createEngField(options: {name: string, error?: string, help?: string, label?: string}, additional?: { icon?: string, required?: string }): any {
    const field = new FormFieldComponent();
    field.name = options.name;
    field.label = options.label||options.name;
    field.help = options.help;
    field.type = 'text';
    if( additional ){
      field.required = additional.required;
      field.icon = additional.icon;
    }
    field.validators.push(this.validation.createEngTextValidator(options.error||'please input text in english'));
    return field;
  }

}
