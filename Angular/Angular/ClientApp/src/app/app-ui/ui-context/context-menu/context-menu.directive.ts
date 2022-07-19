import { ContextMenuService } from './context-menu.service';
import { ContextMenuItemModel } from './context-menu-item.model';
import { ViewContainerRef} from '@angular/core';
import { Directive} from '@angular/core';
import { OnInit} from '@angular/core';
import { OnDestroy} from '@angular/core';
import { ElementRef} from '@angular/core';


/**
 * Директива регистрирует модель контекстного меню,
 * добавляет слушатель событий вызова контектного меню
 * в DOM-элемент, при наступлении события вызывает функцию сервиса
 * для открытия контекстного меню
 */
@Directive({
  selector: '[appContextMenu]',
  inputs: ['appContextMenu']
})
export class ContextMenuDirective implements OnInit, OnDestroy {

  /** модель контекстного меню, передаётся через атрибут */
  public appContextMenu: Array<ContextMenuItemModel>;

  /** функция открытия контектного меню */
  private openContextMenu: ( evt ) => any;

  constructor( private elementRef: ElementRef,
               private contextMenuService: ContextMenuService,
               private viewContainerRef: ViewContainerRef  ) {}

  /** получение DOM-элемента */
  get dom() { return this.elementRef.nativeElement; }

  /** получение компонента */
  // get componentRef(){  this.viewContainerRef.instance; }

  /**
   * при инициаллизации добавляет слушатель событий вызова контектного меню
   * в DOM-элемент, при наступлении события вызывает функцию сервиса
   * для открытия контекстного меню
   */
  ngOnInit(): void {
    const ctrl = this;
    this.dom['addEventListener']('contextmenu', function( evt ) {
      evt.preventDefault();
      if ( !ctrl.appContextMenu || !(ctrl.appContextMenu instanceof Array) || ctrl.appContextMenu.length === 0) {
        throw new Error('context menu items not defined as Array of ContextMenuitem\'s');
      } else {
        ctrl.contextMenuService.openContextMenu( evt, ctrl.appContextMenu );
      }
    });
  }

  /**
   * при уничтожении удаляет слушатель событий созданный при инициаллизации
   */
  ngOnDestroy(): void {
    const ctrl = this;
    this.dom['removeEventListener']('contextmenu', ctrl.openContextMenu);
  }


}
