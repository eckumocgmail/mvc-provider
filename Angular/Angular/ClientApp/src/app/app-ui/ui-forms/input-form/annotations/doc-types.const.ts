import { controlTypes } from './control-types.const'

export const fileTypes = {
  pdf: function( maxsize?: number ){
    return controlTypes.file( ['application/pdf'], maxsize );
  },
  xls: function( maxsize?: number ){
    return controlTypes.file( ['application/xls'], maxsize );
  },
  xlsx: function( maxsize?: number ){
    return controlTypes.file( ['application/xlsx'], maxsize );
  },
  doc: function( maxsize?: number ){
    return controlTypes.file( ['application/doc'], maxsize );
  },
  docx: function( maxsize?: number ){
    return controlTypes.file( ['application/docx'], maxsize );
  }
}
