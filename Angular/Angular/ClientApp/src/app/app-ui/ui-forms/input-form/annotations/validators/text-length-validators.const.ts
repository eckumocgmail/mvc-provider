export const textLengthValidators = {

  length: function( min: number, max: number ){
    if ( min < 1 ) {
      throw new Error('минимальная длина строки не может быть меньше одного символа');
    } else if ( max <= min ) {
      throw new Error('максимальное количество сиволов в строке должно быт меньше минимального');
    } else if ( max > 255 ) {
      throw new Error('максимальная длина строки не может быть больше 255 символов');
    } else {
      return function( target, prop ) {
        textLengthValidators.minLength(min)(target,prop);
        textLengthValidators.maxLength(max)(target,prop);
      }
    }
  },

  /** миниммальная длина строки */
  minLength: function( length: number, message?: string ) {
    if ( length < 1 ) {
      throw new Error('минимальная длина строки не может быть меньше одного символа');
    } else {
      return function( target, prop ) {
        if ( !target.__descriptor__ ) { target.__descriptor__ = {}; }
        if ( !target.__descriptor__[prop] ) {target.__descriptor__[prop] = { validators: [] }; }
        target.__descriptor__[prop].validators.push(function( value ) {
          if ( !value || value.length < length ) {
            if ( message ) {
              throw new Error( message );
            } else {
              throw new Error('длина свойства ' + prop + ' должна быть не меньше ' + length + ' символов');
            }
          }
        });

      };
    }
  },

  /** максимальная длина строки */
  maxLength: function( length: number, message?: string  ) {
    if ( length < 1 ) {
      throw new Error('максимальная длина строки не может быть меньше одного символа');
    } else if ( length > 255 ) {
      throw new Error('максимальная длина строки не может быть больше 255 символов');
    } else {
      return function( target, prop ) {
        if ( !target.__descriptor__ ) { target.__descriptor__ = {}; }
        if ( !target.__descriptor__[prop] ) {target.__descriptor__[prop] = { validators: [] }; }
        if ( !target.__descriptor__[prop].validators ) { target.__descriptor__[prop].validators = []; }
        target.__descriptor__[prop].validators.push(function( value ) {
          if ( value && value.length > length ) {
            if ( message ) {
              throw new Error(message);
            } else {
              throw new Error('длина свойства ' + prop + ' должна быть не больше ' + length + ' символов');
            }
          }
        });
      };

    }
  }

}
