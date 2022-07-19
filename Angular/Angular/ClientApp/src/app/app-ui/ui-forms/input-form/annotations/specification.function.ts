import { OnInit} from '@angular/core';




/**
 * Декоратор классов прикрепляющий описание.
 */
export function specification( definition: {
                                icon: any,
                                label?: string,
                                tooltip?: string  }) {
    // definition['ngOnInit'] = function(){ }
    return function specification( constructor: Function ) {
        if ( !definition.label ) {
            definition.label = constructor.name;
        }
        Object.assign( constructor, definition );
        Object.assign( constructor, {
          get path(){
            return constructor.name;
          },
          component: constructor
        } );


        constructor.prototype.__proto__ = constructor;
        // Object.assign( constructor.prototype, definition );
        /*constructor['__about__'] = function(){
            return definition;
        }   */
    };
}
