import { description} from './description.function';

export const annotations = {
  hint: function( message: string ){
    return function(target, prop) {
      description(target, prop).input = {type: 'primitive', input: 'url'};
      //validators.url()(target, prop);
      if ( !target.__descriptor__ ) { target.__descriptor__ = {}; }
      if ( !target.__descriptor__[prop] ) {target.__descriptor__[prop] = { validators: [] }; }
      if ( !target.__descriptor__[prop].validators ) {target.__descriptor__[prop].validators = []; }
      if ( !target.__descriptor__[prop].hints ){
        target.__descriptor__[prop].hints = [message];
      }else{
        target.__descriptor__[prop].hints.push(message);
      }
    };
  },
  label: function( text: string ){
    return function(target, prop) {
      description(target, prop).label = text;

    };
  }
}
