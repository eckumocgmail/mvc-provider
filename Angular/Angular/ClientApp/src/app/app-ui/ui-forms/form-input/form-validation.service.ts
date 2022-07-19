import { FormFieldComponent } from './form-field.component';
import { FormViewComponent } from './form-view.component';
import { Injectable } from "@angular/core";

@Injectable()
export class FormValidationService
{
  createPhoneValidator(arg0: string): Function {
    return function( form: FormViewComponent, field: FormFieldComponent, value: string  ){

      const message = value;
      if( !message ){
        throw new Error(message);
      }else{
        if( message.length !== '7-904-334-1124'.length ){
            throw new Error(message);
        }else{
            function isNumber( ch ){
              return '0123456789'.indexOf(ch)!==-1;
            }
            if( message[1] !== '-' || message[5] !== '-' || message[9] !== '-' ){
              throw new Error(message);
            }else{
              if( isNumber(message[0])===false ||
                  isNumber(message[2])===false ||  isNumber(message[3])===false ||  isNumber(message[4])===false ||
                  isNumber(message[6])===false ||  isNumber(message[7])===false ||  isNumber(message[8])===false ||
                  isNumber(message[10])===false ||  isNumber(message[11])===false ||
                  isNumber(message[12])===false ||  isNumber(message[13])===false ){
                    throw new Error(message);
                  }
            }
        }
      }
    }

  }
  createUrlValidator(error: string): Function {
    return function( form: FormViewComponent, field: FormFieldComponent, value: string  ){
      if( !new RegExp(/^(ftp|http|https):\/\/[^ "]+$/).test(value) ){
        throw new Error(error);
      }
    }
  }
  createRusTextValidator( error: string ): Function {
    return function( form: FormViewComponent, field: FormFieldComponent, value: string  ){
      if( !new RegExp(/^[а-яА-ЯёЁ]+$/).test(value) ){
        throw new Error(error);
      }
    }
  }
  createEngTextValidator( error: string ): Function {
    return function( form: FormViewComponent, field: FormFieldComponent, value: string  ){
      if( !new RegExp(/^[a-zA-Z]+$/).test(value) ){
        throw new Error(error);
      }
    }
  }
  createEmailValidator( error: string ): Function {
    return function( form: FormViewComponent, field: FormFieldComponent, value: string  ){
      if( !new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value) ){
        throw new Error(error);
      }
    }
  }
  createPasswordConfirmationValidator( passwordField: string, errorMessage: string ): Function {
    return function( form: FormViewComponent, field: FormFieldComponent, value: string  ){
      if( form.findField(passwordField).value !== value ){
        throw new Error(errorMessage);
      }
    }
  }

}
