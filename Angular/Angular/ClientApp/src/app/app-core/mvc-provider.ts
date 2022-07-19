import { NotMapped } from 'src/app/app-ui/ui-forms/input-form/annotations/asp-types.const';
import { EntityRepository } from './core-data/entity-repository';
import { FormControlComponent } from './../app-ui/ui-forms/form-input/form-control.component';
import { FormViewComponent } from '../app-ui/ui-forms/form-input/form-view.component';
import { FormFieldComponent } from './../app-ui/ui-forms/form-input/form-field.component';
import { icons,icons_base } from '../app-ui/ui-forms/input-form/app.icons';
export const provider = {

  SelectDataDictionary(args){
    const spices = args[0].split(',');

    const type: string = spices[0];
    const property: string = type.substr(0,1).toLocaleLowerCase()+type.substring(1);
    const label = spices[1];
    return function( field: FormFieldComponent ){
      field.isControl = true;
      field.control = {
        type : 'selectbox',
        options: [],
        oninit(ctrl: FormFieldComponent ){
          if( !ctrl.context ){
            throw new Error('Нет ссылки на контекст данных');
          }else{

            const repository: EntityRepository<any> = ctrl.context[property];
            //alert(property+' '+ctrl.context+' '+repository);
            console.log(repository);
            repository.List().then((resultset )=>{
              console.log(resultset);
              //ctrl.control['options'] = [{text: 'test',value: 1}];
              ctrl.control['options'] = [{text: '', value: null }].concat(resultset.map(p=>{
                return { text: p[label], value: p['ID'] };
              }));
            });
          }
        }
      }
    }
  },

  InputIcon(args){
    return function( field: FormFieldComponent ){
      field.isControl = true;
      field.control = {
        type:     'icon',
        options:  [{text: '', value: null }].concat(icons_base.map(p=>{ return { text: p, value: p}; }))
      }
      return field;
    }
  },

  Navigation(args){
    return function( field: FormFieldComponent ){
      field.mapped = false;
      return field;
    }
  },

  type(args){
    return function( field: FormFieldComponent ){
      //TODO:
    }
  },

  propertyName(args){
    return function( field: FormFieldComponent ){
      //TODO:
    }
  },

  isRequired(args){
    return function( field: FormFieldComponent ){
      if( !field.required ){
        field.required = 'Необходимо задать значение свойства '+field.name;
      }
      return field;
    }
  },

  isUnique(args){
    return function( field: FormFieldComponent ){
      if( !field.unique ){
        field.unique = 'Значение свойства '+field.name+' Должно быть уникальным';
      }
      return field;
    }
  },

  NotNullNotEmpty( args ){
    return function( field: FormFieldComponent ){
      field.required = args[0];
      return field;
    }
  },

  NotInput( args ){
    return function( field: FormFieldComponent ){
      field.mapped = false;
      return field;
    }
  },

  InputHidden( args ){
    return function( field: FormFieldComponent ){
      field.type = "hidden";
      return field;
    }
  },


  Label( args ){
    return function( field: FormFieldComponent ){
      field.label = args[0];
      return field;
    }
  },

  Key( args ){
    return function( field: FormFieldComponent ){
      field.type = "hidden";
      return field;
    }
  },


  InputBinary( args ){
    return function( field: FormFieldComponent ){
      field.type= 'file';
    }
  },

  InputMultilineText(args){
    return function(control: FormControlComponent){
      control.isControl = true;
      control.control = {
        type: 'textarea'
      };
    }
  },

  InputPhone( args ){
    return function( field: FormFieldComponent ){
      field.type = 'text';
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
      field.validators.push(function( form: FormViewComponent, field: FormFieldComponent, value: string  ){

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
      });
      return field;
    }
  },


  InputDate(args){
    return function( field: FormFieldComponent ){
      field.type = 'date';
      return field;
    }
  }
}





/*

class FormValidationService
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
*/
