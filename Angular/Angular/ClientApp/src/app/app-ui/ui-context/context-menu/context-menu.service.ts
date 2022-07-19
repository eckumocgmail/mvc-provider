import { ContextMenuItemModel } from './context-menu-item.model';
import { ComponentRef} from '@angular/core';
import { Inject} from '@angular/core';
import { Component} from '@angular/core';
import { Injectable} from '@angular/core';
import { ContextMenuComponent } from './context-menu.component';


/**
 * делегирует компонент контекстного меню и реализует функцию открытия меню
 * с проверкой регистрации компонента контекстного меню
 */
@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  contextMenuComponentRef: ContextMenuComponent;

  constructor() {

  }

  /**
   * проверка регистрации компонента контекстного меню в сервисе
   */
  validateContextmenuComponent() {
    if ( !this.contextMenuComponentRef ) {
      throw new Error('context menu component not initiallized at context menu service');
    } else {
      return true;
    }
  }

  /**
   * функция открытияконтекстного меню
   * @param evt событие нажатия правой кнопки мыши
   * @param model модель контекстного меню
   */
  openContextMenu( evt: MouseEvent, model: Array<ContextMenuItemModel> ) {
    if ( this.validateContextmenuComponent() ) {
      this.contextMenuComponentRef.openContextMenu( evt, model );
    }
  }
}
