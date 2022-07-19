import { description } from './description.function';

export const dataTypes = {

  number: function( floating :boolean = true, min?: number, max?: number) {
      return function(target, prop) {
          description(target, prop).input = {type: 'primitive', input: 'number'};
          // TODO:
      };
  },
  date: function( format? ) {
    return function(target, prop) {
        target[prop] = new Date();
        description(target, prop).input = {type: 'primitive', input: 'date', format};
    };
  },
  string: function( lang?: 'ru'|'eng'|'number', length?: {  min: number, max: number }) {
    return function(target, prop) {
        description(target, prop).input = {type: 'primitive', input: 'text'};
        // TODO:
    };
  },

};
