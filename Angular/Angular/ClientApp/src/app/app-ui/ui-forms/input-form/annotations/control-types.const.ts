import { Type} from '@angular/core';
import { description} from './description.function';
import { fileExts } from './file-exts.const';
import { types } from 'util';





//Object.values(fileExts).reduce((a,b)=>{return a.concat(b)})
export const controlTypes = {

  icon: function( ) {
      return function( target, prop ) {
          description(target, prop).input = {type: 'control',
            input: 'icon'
          };
      };
  },
  image: function(){
      return controlTypes.file();
  },
  textarea: function(  ) {
      return function(target, prop) {
          description(target, prop).input = {type: 'control', input: 'textarea'};
      };
  },
  boolean: function(  ) {
      return function(target, prop) {
          description(target, prop).input = {type: 'control', input: 'checkbox'};
      };
  },
  checkbox: function(  ) {
      return function(target, prop) {
          description(target, prop).input = {type: 'control', input: 'checkbox'};
      };
  },
  file: function( exts?: string[], maxsize?: number ) {
      function toCSV( arr: string[] ){
        let s = '';
        arr.forEach(item=>{
          s+=','+item;
        });
        return s.substr(1);
      }
      return function(target, prop) {
          description(target, prop).input = {type: 'control', input: 'file', accepts: toCSV(!exts? ['*.*']: exts) };
      };
  },
  selectbox: function(options) {
      return function( target, prop ) {
          description(target, prop).input = {type: 'control', input: 'selectbox', multiselect: false, options};
      };
  },
  multiselectbox: function(options) {
      return function( target, prop ) {
          description(target, prop).input = {type: 'control', input: 'multiselectbox', multiselect: false, options};
      };
  },
  radiogoup: function(options) {
      return function( target, prop ) {
          description(target, prop).input = {type: 'control', input: 'radiogroup', options};
      };
  },
  // selectDialog( type: 'table'|'list'|'grid'|'image'|'tree', multi: boolean, items: [], uniq: boolean ){},

  dropbox: function() { throw new Error('unsupported'); }
};
