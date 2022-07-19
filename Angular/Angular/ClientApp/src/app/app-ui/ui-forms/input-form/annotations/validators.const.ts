import { textValidators } from './validators/text-validators.const';
import { HttpRequest} from '@angular/common/http';
import { description} from './description.function';
import { descriptor} from './descriptor.function';






/**
 * Функциональный обьект для внедрения посредника выполняющего проверки свойств обьекта
 *
 * пример:
   class a{

        @validators.required
        @validators.minLength(4)
        @validators.maxLength(6)
        @validators.oneOf(['name1','name2'])
        name: string;

        constructor(){
            this.name = 'name1';к
            return validators.create(this);
        }
   }
 */
export const validators = Object.assign({

    optional: function( fx: Function ) {
      return function maxLength( target, prop ) {
        if ( !target.__descriptor__ ) { target.__descriptor__ = {}; }
        if ( !target.__descriptor__[prop] ) {target.__descriptor__[prop] = { validators: [] }; }
        if ( !target.__descriptor__[prop].validators ) {target.__descriptor__[prop].validators = []; }
        target.__descriptor__[prop].validators.push(fx);
      };
    },

    equals: function( fx ) {
      return function( target, prop ) {
        if ( !target.__descriptor__ ) { target.__descriptor__ = {}; }
        if ( !target.__descriptor__[prop] ) {target.__descriptor__[prop] = { validators: [] }; }
        target.__descriptor__[prop].validators.push(function( value ) {
          if ( value && value.length > length ) {
            if ( value !== fx() ) {
              throw new Error('значение отличается от оригинала');
            }
          }
        });
      };
    },



    validate: function( fx: ( value ) => void, message: string ) {
      if ( !fx ) {
        throw new Error('необходимо определить функцию проверка');
      } else {
        return function validate( target, prop ) {
          if ( !target.__descriptor__ ) { target.__descriptor__ = {}; }
          if ( !target.__descriptor__[prop] ) {target.__descriptor__[prop] = { validators: [] }; }
          target.__descriptor__[prop].validators.push(function validate( value ) {
            try {
              fx( value );
            } catch (e) {
              throw new Error(message);
            }
          });
        };
      }
    },






    /** получение проверочных функций */
    get: function( target, prop ) {
      return description(target, prop).validators;

    },

    /** вешать на конструктор */
    create: function( instance ) {
      const descriptors = instance.__descriptor__;


      return new Proxy( instance, {

        get() {
          return instance;
        },

        /** получение прототипа **/
        getPrototypeOf(target) {
          if ( Object.is(target, instance) ) {
            return Object.getPrototypeOf( instance );
          } else {
            return Object.getPrototypeOf( target );
          }
        },

        /** обработка методов изменения свойств */
        set( target, prop, value ) {
          if ( !descriptors[prop] ) {
            target[prop] = value;
            return true;
          } else {

            if ( !descriptors[prop].validators ) {
              // console.warn('property descriptors defined but validators not');
            } else {
              descriptors[prop].errors = [];
              for ( let i = 0; i < descriptors[prop].validators.length; i++ ) {
                try {

                  descriptors[prop].validators[i].apply( this.get(), [value] );
                } catch (e) {
                  console.log(e.message)     ;
                  descriptors[prop].errors.push(e.message);
                } finally {
                  continue;
                }
              }
              if ( descriptors[prop].errors.length > 0) {
                console.log(JSON.stringify(descriptors[prop].errors));
                throw new Error(JSON.stringify(descriptors[prop].errors));
              }

            }
            target[prop] = descriptors[prop].value = value;
            console.log( target[prop] );
            return true;
          }

        }
      });
    },

    /**
     * подтверждение
     * @param property
     * @param message
     */
    confirmation: function( property: string, message?: string ) {
      if ( !property ) {
        throw new Error('имя свойства подтверждение которого необходимо проверить должно быть указано');
      } else {
        return function confirmation( target, prop ) {
          if ( target[property] ) {
            throw new Error('property ' + property + ' not exist and can not be confirmated');
          }
          if ( !target.__descriptor__ ) { target.__descriptor__ = {}; }
          if ( !target.__descriptor__[property] ) {
            target.__descriptor__[property] = { validators: [], value: target[property] };
          }
          if ( !target.__descriptor__[prop] ) {target.__descriptor__[prop] = { validators: [] }; }

          // var tempValue;  //значение в поле для ввода, после первого выполнения функции validate
          // console.log('confirmation', target);
          function validate( value ) {
            // console.log('confirmation', value, this[property]);
            if ( value !== this[property]/*target['__descriptor__'][property].value*/  ) {
              if ( !message ) {
                throw new Error('свойство ' + prop + ' должно соответвовать свойству ' + property);
              } else {
                throw new Error(message);
              }
            }

          }
          if ( !target.__descriptor__[prop].validators ) { target.__descriptor__[prop].validators = []; }
          target.__descriptor__[prop].validators.push( validate );
        };
      }
    },



    /** нулевые значения не устанавливаются */
    required:
    function( required: boolean, message?: string ) {
      if ( !required ) {
        throw new Error('признак обязательного свойства не задан свойство');
      } else {
        return function required( target, prop ) {
          if ( !target.__descriptor__ ) { target.__descriptor__ = {}; }
          if ( !target.__descriptor__[prop] ) {target.__descriptor__[prop] = { validators: [] }; }
          if ( !target.__descriptor__[prop].validators ) { target.__descriptor__[prop].validators = []; }
          target.__descriptor__[prop].validators.push(function required( value ) {
            if ( typeof(value)==='undefined' || value=='' || value==null  ) {
              if ( !message ) {
                throw new Error('свойство ' + prop + ' должно быть определно как действительное значение');
              } else {
                throw Object.assign(new Error(),{message: message});
              }
            }
          });
        };
      }
    },






    /** проверка значения на принадлежность заданному множеству */
    oneOf: function( valuesSet: Array<any>, message?: string ) {
      if ( !valuesSet || valuesSet.length === 0 ) {
        throw new Error('диапазон разрешенных значений не задан');
      } else {
        return function( target, prop ) {

          if ( !target.__descriptor__ ) { target.__descriptor__ = {}; }
          if ( !target.__descriptor__[prop] ) {target.__descriptor__[prop] = { validators: [] }; }
          target.__descriptor__[prop].valuesSet = valuesSet;
          target.__descriptor__[prop].validators.push(function( value ) {
            if ( valuesSet.indexOf(value) === -1 ) {
              if ( message ) {
                throw new Error( message );
              } else {
                throw new Error(this.constructor.name + 'значение свойства ' + prop + ' не попадает в диапазон разрешенных значений');
              }
            }
          });

        };
      }
    }
},textValidators);
