import { provider } from './../../../app-core/mvc-provider';
import { FormControlComponent } from './form-control.component';
import { FormFieldComponent } from './form-field.component';
import { FormControlService } from './form-control.service';
import { FormFieldService } from './form-field.service';
import { Injectable } from "@angular/core";
import { input, spec } from './input-context';

@Injectable( )
export class FormInputService
{

  constructor( private fields: FormFieldService, private controls: FormControlService ){
  }

  getLabelFor(typename: string){
    const attributes = this.parseEntityType(typename);
    return attributes? attributes['EntityLabel']: null;
  }


  parseEntityType( typename: string ){
    if(typename[0]===typename[0].toLowerCase()){
      typename=typename.substr(0,1).toUpperCase()+ typename.substr(1);
    }
    const attributes = {};
    try{
      if( !spec[typename] ){
        throw new Error('Сущность '+typename+' не зарегистрирована в контексте моделей данных');
      }
      Object.getOwnPropertyNames(spec[typename]).forEach(name=>{
        attributes[name]=spec[typename][name][0];
      });

    }catch(e){
      console.error(e);
    }
    return attributes;
  }

  parseFields( target: any ){
      const ctrl = this;
      const fields = [];
      Object.getOwnPropertyNames(target).forEach(name=>{


      const attributes = input[target.constructor.name][name];
      const type = typeof(target[name]);
      let field = ctrl.createField( attributes, name, type, target );
      fields.push(field);

    });
    return fields;
  }

  createField( attributes: { [property: string]: {}; },
                name: string,
                 type: string,
                  target: any) {
    let field = new FormFieldComponent();
    field.name = name;
    field.label = name;
    switch(type){
      case 'boolean': field = this.controls.createCheckboxControl({name: name, label: field.label}); break;
      case 'number': field.type = "number"; break;

      default: field.type = "text"; break;
    }
    if(attributes){
      Object.getOwnPropertyNames(attributes).forEach(name=>{
        if( !provider[name] ){
          console.warn('Платформа клиентской стороны не поддерживает атрибут '+name);
        }else{
          Object.assign(field, provider[name](attributes[name])(field));
        }
      });
    }else{

    }

    field.value = target[name];
    return field;
  }
}
