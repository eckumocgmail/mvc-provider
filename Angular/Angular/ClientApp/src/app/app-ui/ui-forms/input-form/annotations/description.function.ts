import { descriptor} from './descriptor.function';

export function description( target, prop ) {
  const p = descriptor(target);
  if ( !p[prop] ) {return p[prop] = { label: prop }; } else { return p[prop]; }
}




