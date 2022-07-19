import { Type} from '@angular/core';
import { description} from './description.function';
import { descriptor} from './descriptor.function';
import { validators} from './validators.const';
import { dataTypes } from './data-types.const';






/**
 * аннотации указывающие тип элемента ввода данных input
 */
export const inputTypes = Object.assign({

  //TODO:
  phone: function( message?: string ) {
      return function(target, prop) {
          description(target, prop).input = {type: 'primitive', input: 'phone'};
          validators.validate((val)=>{
            const message = val;
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
          },message+'( формат X-XXX-XXXX-XXXX )')(target,prop);
      };
  },
  url: function( mimeType?: MimeTypeArray|MimeType ) {
      return function(target, prop) {
          description(target, prop).input = {type: 'primitive', input: 'url'};
          validators.url()(target, prop);
      };
  },
  email: function(   ) {
      return function(target, prop) {
          description(target, prop).input = {type: 'primitive', input: 'email'};
          validators.email()(target, prop);
      };
  },

  text: function( lang?: 'ru'|'eng'|'number', length?: {  min: number, max: number }) {
      return function(target, prop) {
          description(target, prop).input = {type: 'primitive', input: 'text'};
          // TODO:
      };
  },
  color: function( ) {
      return function(target, prop) {
          description(target, prop).input = {type: 'primitive', input: 'color'};
      };
  },
  password: function(  ) {
      return function(target, prop) {
          description(target, prop).input = {type: 'primitive', input: 'password'};
      };
  },
  confirmation: function( property: string, message?: string ) {
      return function( target, prop ) {
          description(target, prop).input = {type: 'primitive', input: 'password'};
          validators.confirmation( property, message )( target, prop );
      };
  },

  week: function(  ) {
      return function(target, prop) {
          description(target, prop).input = {type: 'primitive', input: 'week'};
      };
  },
  month: function(  ) {
      return function(target, prop) {
          description(target, prop).input = {type: 'primitive', input: 'month'};
      };

  },
},dataTypes);



