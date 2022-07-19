import { controlTypes } from './control-types.const'

export const imageTypes = {
  html: function( maxsize?: number ){
    return controlTypes.file( ['html'], maxsize );
  },
  xml: function( maxsize?: number ){
    return controlTypes.file( ['xml'], maxsize );
  },
  json: function( maxsize?: number ){
    return controlTypes.file( ['json'], maxsize );
  },
  js: function( maxsize?: number ){
    return controlTypes.file( ['js'], maxsize );
  },
  ts: function( maxsize?: number ){
    return controlTypes.file( ['ts'], maxsize );
  },
  cs: function( maxsize?: number ){
    return controlTypes.file( ['cs'], maxsize );
  },
  css: function( maxsize?: number ){
    return controlTypes.file( ['css'], maxsize );
  }
}

