/**
 * Декоратор классов прикрепляющий описание.
 */
export function specification(

  definition: {
    icon:     any,
    label?:   string,
    example?:  string,

    tooltip?: string  }) {

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
        });
    };
}
