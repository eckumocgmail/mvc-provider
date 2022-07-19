import { textLengthValidators } from './text-length-validators.const';

export const textValidators = Object.assign({



  /** проверка значения на соответсвие правилам именования электронных адресов */
  email: function( message?: string ) {
    const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return textValidators.regexp( regexp, message || 'Значение не отвечает правилам именования электронных адресов' );
  },

  /** проверка символов на вхождение в множество рускоязычных символов */
  rus: function( message?: string ) {
    const regexp = /^[а-яА-ЯёЁ]+$/;
    return textValidators.regexp( regexp, message || 'Значение должно быть определено символами кириллицы' );
  },

  /** проверка символов на вхождение в множество рускоязычных символов */
  eng: function( message?: string ) {
    const regexp = /^[a-zA-Z]+$/;
    return textValidators.regexp( regexp, message || 'Значение должно быть определено символами латинского алфавита' );
  },

  /** проверка значения на соответсвие правилам именования URL адресов */
  url: function( message?: string ) {
    const regexp = /^(ftp|http|https):\/\/[^ "]+$/;
    const firstStepValidation = textValidators.regexp( regexp, message || 'Значение не отвечает правилам именования URL' );
    return function( target, prop ) {
      if ( !target.__descriptor__ ) { target.__descriptor__ = {}; }
      if ( !target.__descriptor__[prop] ) {target.__descriptor__[prop] = { validators: [] }; }
      if ( !target.__descriptor__[prop].validators ) {target.__descriptor__[prop].validators = []; }
      target.__descriptor__[prop].validators.push(function( value ) {
        const expression = new RegExp( regexp );
        if ( !expression.test( value ) ) {
          throw new Error( message || 'Значение не отвечает правилам именования электронных адресов');
        } else {
          // const request = new XMLHttpRequest();
          // try {
          //   request.open('get', value, false);
          //   request.send(null);
          //   console.log( request.getAllResponseHeaders() );
          // } catch (e) {
          //   throw new Error('URL не является действительным');
          // }
          // console.log( request.status );
          // if ( request.status !== 200 ) {
          //   throw new Error('URL не является действительным');
          // }
        }
      });
    };
  },

  /** проверка значения на соответсвие регулярному выражению */
  regexp: function( regexp, message?: string  ) {
    const expression = new RegExp( regexp );
    if ( !regexp ) {
        throw new Error('регулярное выражение не задано');
    } else {
        return function( target, prop ) {
          if ( !target.__descriptor__ ) { target.__descriptor__ = {}; }
          if ( !target.__descriptor__[prop] ) {target.__descriptor__[prop] = { validators: [] }; }
          if ( !target.__descriptor__[prop].validators ) {target.__descriptor__[prop].validators = []; }
          target.__descriptor__[prop].validators.push(function( value ) {
            if ( !expression.test( value ) ) {
              if ( message ) {
                throw new Error( message );
              } else {
                throw new Error('значение не отвечает правилам ввода');
              }

            }
          });

        };
    }
  },


}, textLengthValidators);
