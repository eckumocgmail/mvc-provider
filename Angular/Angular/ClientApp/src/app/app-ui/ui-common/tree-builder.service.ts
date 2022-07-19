import { Inject} from '@angular/core';
import { Injectable} from '@angular/core';
import { of} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TreeBuilderService {

  constructor() {}

  /**
   * Обход иерархически структурированного обьекта
   * @param action действие для каждого узла
   * @param getChildren получение дочерних ссылок
   */
  public recursive( node, action, getChildren ) {
      // console.log( node.constructor.name );
      if ( node ) {
        action( node );
        const ctrl = this;
        const children = getChildren( node );
        if ( children  && children instanceof Array) {
          children.forEach((child) => {
            ctrl.recursive(child, action, getChildren);
          });
        }
      }

  }





  /**
   * Созхдание модели приедставления по свойствам обьекта
   * @param target ссылка на обьект
   */
  public fromObject( target ):  {
                      icon:     string,
                      label:    string,
                      tooltip:  string,
                      children: any[     ]} {
    const item = {
        icon:     'folder',
        label:    'root',
        tooltip:  'root',
        children: [     ]
    };
    if ( target ) {
      Object.getOwnPropertyNames( target ).forEach((name) => {

        if ( typeof( target[name] ) === 'object' ) {
          const pchild = this.fromObject( target[name] );
          pchild.label = name;
          item.children.push( pchild );
        } else if ( typeof( target[name] ) === 'function' ) {
          item.children.push({
              icon:     'info',
              label:    name,
              tooltip:  'root',
              children: [     ]
          });
        }
    });

    }
    return item;
  }
}
