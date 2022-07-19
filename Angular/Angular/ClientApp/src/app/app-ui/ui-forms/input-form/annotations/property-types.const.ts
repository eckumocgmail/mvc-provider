import { Type} from '@angular/core';
import { controlTypes} from './control-types.const';
import { inputTypes} from './input-types.const';
import { structureTypes} from './structure-types.const';




export const propertyTypes = Object.assign( Object.assign(controlTypes, structureTypes), inputTypes);
