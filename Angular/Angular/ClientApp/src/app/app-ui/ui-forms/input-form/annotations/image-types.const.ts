import { controlTypes } from './control-types.const'

export const imageTypes = {
  png: function( maxsize?: number ){
    return controlTypes.file( ['image/png'], maxsize );
  },
  jpeg: function( maxsize?: number ){
    return controlTypes.file( ['image/jpeg'], maxsize );
  },
  gif: function( maxsize?: number ){
    return controlTypes.file( ['image/gif'], maxsize );
  }
}
