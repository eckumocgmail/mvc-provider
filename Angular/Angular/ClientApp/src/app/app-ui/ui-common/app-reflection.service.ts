import { AbstractModule } from './core-abstract/abstract-module';

import { Injectable, Injector } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
//import { ModuleComposition } from '../tools/commons/module.composition'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/**
 * Квалификация: аналитический центр применяет методы обратного синтеза информационной модели.
 * Результат зависит от иерархии зависимостей, состава модулей и отношений между ними.
 */
@Injectable({
  providedIn: 'root'
})
export class ReflectionService{

    constructor(   ){ }


    /**
     * Метод обработки модуля и наполнение его производной составляющей.
     * @param subject ссылка на модуль или на его класс
     */
    onModule( subject: any ){
        let name = subject.name;
        const composition = new AbstractModule( name,  subject );

        const annotations = this.getAnnotations(subject);
        for( let i=0; i<annotations.length; i++ ){
            const annotation = annotations[ i ];
            const names = Object.getOwnPropertyNames( annotation );
            for( let j=0; j<names.length; j++ ){
                const name = names[ j ];
                const definition = annotation[ name ];

                switch( name ){
                    case 'id':
                        //composition.ids.push( definition.id );  //?
                        break;
                    case 'providers':
                        break;
                    case 'imports':
                        for( let k=0; k<definition.length; k++ ){
                            const imported = definition[ k ];
                            //исключает базовые модули
                            if( Object.is( imported, BrowserAnimationsModule ) || Object.is( imported, BrowserModule ) || Object.is( imported, CommonModule ) || Object.is( imported, FormsModule ) || Object.is( imported, HttpClientModule )){
                                //composition.baseModules = imported;
                            }else if( imported.name === 'RouterModule' ){
                            }else if( typeof(imported) === 'function' ){
                                composition.children.push( composition[ imported.constructor.name ] = this.onModule( imported ) );
                                composition[ imported.constructor.name ].parent = composition;
                            }else{
                                //console.error(imported.name);
                            }
                        }
                        break;
                    case 'exports':
                        break;
                    case 'declarations':
                        definition.name = name;
                        for( let k=0; k<definition.length; k++ ){
                            composition.declarations.push( definition[ k ] );
                            //console.log( definition[ k ].name );
                        }
                        break;
                    case 'bootstrap':
                        break;
                    default: throw new Error('module definition property '+name+' not supported');
                }
            }
        }
        return composition;
    }

    /**
     * метод получения класса компонента
     * @param subject ссылка на компонент или на его класс
     */
    getComponentClass( subject: object){
        return (typeof(subject)!=='function')? Object.getPrototypeOf( subject ): subject;
    }

    /**
     * метод получения свойства определенного в аннотации, определяющего перечень входящих параметров компонента, заданные в значениях атрибутов
     * @param instance ссылка на компонент или на его класс
     */
    getComponentInputs( instance: object ){
        const annotations = this.getAnnotations( instance )   ;
        if( !annotations || annotations.length==0 ){
            throw new Error('no annotation on object');
        }else{
            if( annotations.length>1 ){
                throw new Error('too much annotations');
            }else{
                if( !annotations[0]['template'] && annotations[0]['templateUrl'] ){
                    throw new Error('annotation is a component definition');
                }else{
                    return annotations[0].inputs;
                }
            }
        }
    }

    /**
     * метод получения аннотаций описывающих компонент
     * @param subject ссылка на компонент или на его класс
     */
    getAnnotations( subject: any ){
        const prototype = this.getComponentClass(subject);
        return prototype['__annotations__'] || prototype.constructor['__annotations__'];
    }

    /**
     * метод получения свойств определённых вобьекте
     * @param subject ссылка на обьект
     */
    getProperties( subject: any ){
        const description = {};
        const names = Object.getOwnPropertyNames( subject );
        for( let i=0; i<names.length; i++){
            const name = names[i];
            description[ name ] = Object.getOwnPropertyDescriptor( subject, name );
        }
        return description;
    }


}
