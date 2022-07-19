import { Type} from '@angular/core';
import { description} from './description.function';






export const structureTypes = {

  object: function() {
      return function( target, prop ) {
          description(target, prop).input = {type: 'structure', input: 'object' };
      };
  },

  array: function( prototype ) {
      return function( target, prop ) {
          description(target, prop)
          .input = {
              type:       'structure',
              input:      'array',
              primitive:  false,
              prototype:  prototype,
              columns:    Object.getOwnPropertyNames(prototype) };
      };
  },

  arrayOfPrimitive: function( type ) {
      return function( target, prop ) {
          description(target, prop).input = {type: 'structure', input: 'array', primitive: true, prototype: type };
      };
  }
};
