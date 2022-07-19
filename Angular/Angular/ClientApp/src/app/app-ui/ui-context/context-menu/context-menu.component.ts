import { materialModules } from './material-modules';
import { ContextMenuItemModel } from './context-menu-item.model';
import { ContextMenuService } from './context-menu.service';

import { ComponentRef} from '@angular/core';
import { ViewContainerRef} from '@angular/core';
import { Compiler} from '@angular/core';
import { Component} from '@angular/core';
import { NgModule} from '@angular/core';
import { OnInit} from '@angular/core';
import { OnDestroy} from '@angular/core';
import { style} from '@angular/animations';

@Component({
  selector: 'context-menu',
  template: '<ng-content></ng-content>'
})
export class ContextMenuComponent implements OnInit, OnDestroy {

  constructor(  public contextmenuService: ContextMenuService,
                public compiler: Compiler,
                public view: ViewContainerRef ) {}

  public static n = 1;
  public static build: any;                   // ссылка на последний модуль
  public static queue: Array<Function> = [];  // очередь компиляции

  flatMenu: any;

  namedContext: any = {};
  menuitems: Array<ContextMenuItemModel> = [];
  cmpRef: ComponentRef<any>;
  contextMenuPosition = {
    x: '0px',
    y: '0px'
  };
  public static run() {                        // запуск компиляции
      while ( ContextMenuComponent.queue.length > 0 ) {
        ContextMenuComponent.queue.shift()();
      }
  }

  /**
   * при инициаллизации экземпляр компонена регистрирует в сервисе
   */
  ngOnInit(): void {
    this.contextmenuService.contextMenuComponentRef = this;
  }
  /**
   * при уничтожении экземпляр компонена удаляет регистрирацию в сервисе
   */
  ngOnDestroy(): void {
    this.contextmenuService.contextMenuComponentRef = null;
  }

  /**
   * Для открытия контекстного меню ссылка на модель элементов меню
   * присваивается свойству экземпляра компонента и вызывает функция
   * обновления( перекомпиляции ).
   * @param evt событие нажатия правой кнопки сыши
   * @param menuitems модель элементов контекстного меню
   */
  openContextMenu( evt: MouseEvent, menuitems: Array<ContextMenuItemModel> ) {
    this.menuitems = menuitems;
    this.update( evt );
  }

  /**
   * Обновляет компонент через составление шаблона компонента и перекомпиляцию
   * @param evt соыбтие нажатия правой кнопки мыши
   */
  update( evt: MouseEvent ) {
    this.namedContext = {};
    let template = this.createTemplate( this, null );
    template +=
      '<div style="visibility: hidden; position: fixed" ' +
            '[style.left]="contextMenuPosition.x" ' +
            '[style.top]="contextMenuPosition.y" ' +
            '[matMenuTriggerFor]="appMenu" id="appMenu"> ' +
      '</div>  ';
    /*template +=
      '<button (click)="popup()">open</button>'+
      '<button mat-icon-button [matMenuTriggerFor]="appMenu" id="appMenu">'+
        '<mat-icon>more_vert</mat-icon>'+
      '</button>'; */
    const ctrl = this;
    const link = function() {

        /** проверка регистрации  */
        if ( !ContextMenuComponent.build ) {
          throw new Error('AppModule not initiallized at ContextMenuComponent.build');
        }

        /** создание динамического компонента */
        const cmp = Component({
            template: template
        })(class {
            constructor() {
              this['__proto__'] = ctrl;
              function showContextMenu( ) {
                ctrl.contextMenuPosition.x = evt.clientX + 'px';
                ctrl.contextMenuPosition.y = evt.clientY + 'px';
                const showMenuElement = document.getElementById('appMenu');
                showMenuElement.click();
                console.log(evt.clientX, evt.clientY);
              }
              setTimeout(showContextMenu, 1);
            }
        });

        /** создание динамического модуля с созданным компонентом */
        const module = NgModule({
            imports:        materialModules.concat([ ContextMenuComponent.build  ]),
            declarations:   [ cmp ],
            bootstrap:      [ cmp ]
        })(class {});

        /** компеиляция и создание представления компонента */
        ctrl.compiler.compileModuleAndAllComponentsAsync<any>(module).then((moduleFactory) => {
            const factory = moduleFactory.componentFactories[moduleFactory.componentFactories.length - 1];
            ctrl.view.clear();
            ctrl.cmpRef = ctrl.view.createComponent( factory, ctrl.view.length );
        });
    };

    // если AppModule незарегистрирован то функция регистрируется в очереди выполнения
    if ( !ContextMenuComponent.build ) {
        ContextMenuComponent.queue.push(link);
    } else {
        link();
    }
  }

  /**
   * Создаёт шаблон пункта меню для динамической компиляции
   * @param menuitem модель пункта меню
   * @param id идентификатор пункта меню
   */
  createTemplate( menuitem, id ) {
    const nodeid = ( !id ) ? 'appMenu' : id;
    menuitem.id = nodeid;
    this.namedContext[ nodeid ] = menuitem;
    let posttemplate = '';
    let template = '<mat-menu #' + nodeid + '="matMenu" >';
    for ( let i = 0; i < menuitem.menuitems.length; i++ ) {
      menuitem.menuitems[i].parent = menuitem;
      if ( menuitem.menuitems[i].menuitems && menuitem.menuitems[i].menuitems.length > 0 ) {
        const menuId = nodeid + '_' + i;
        template +=
        '<button mat-menu-item [matMenuTriggerFor]="' + menuId + '">' +
          '<mat-icon>' + menuitem.menuitems[i].icon + '</mat-icon>' +
          '<span>' + menuitem.menuitems[i].label + '</span>' +
        '</button>';
        // this.flatMenu[menuitem.menuitems[i]];
        posttemplate += this.createTemplate(menuitem.menuitems[i], menuId);
      } else {
        template +=
          '<button mat-menu-item (click)="onClick($event,\'' + menuitem.id + '\',' + i + ')">' +
            '<mat-icon>' + menuitem.menuitems[i].icon + '</mat-icon>' +
            '<span>' + menuitem.menuitems[i].label + '</span>' +
          '</button>';
      }
    }
    template += '</mat-menu>';
    return template + posttemplate;
  }


  onClick( evt, context, index ) {
    this.namedContext[ context ].menuitems[ index ].click();
  }

}
