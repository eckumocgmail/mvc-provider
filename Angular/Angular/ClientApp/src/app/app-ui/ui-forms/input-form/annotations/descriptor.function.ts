



export function descriptor( target ) {
  if ( !target.__descriptor__ ) {
      return target.__descriptor__ = {};
  } else { return target.__descriptor__; }
}



