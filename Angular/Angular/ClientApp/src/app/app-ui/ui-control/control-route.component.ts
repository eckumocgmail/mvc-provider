import { Injector } from '@angular/core';
import { UiCommonComponent } from 'src/app/app-ui/ui-common/ui-common.component';
import { ActivatedRouteSnapshot, Router, ActivatedRoute, RoutesRecognized, Routes } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'control-route',
  template: `
    <control-nav [options]="links" [orientation]="orientation"></control-nav>
  `,
  styles: [
  ]
})
export class ControlRouteComponent
extends UiCommonComponent {

  @Output('selected') onSelect = new EventEmitter();
  @Output() select = new EventEmitter();
  @Input()
  orientation: 'vertical'|'horizontal' =  'vertical';

  @Input()
  path: string = '/';

  nodelist = [];

  title: string = '123';
  menuitems: Array<{
    icon:       string;
    label:      string;
    path:       string;
    children:  Array<any>;
  }>=[];

  constructor(  private router: Router, injector: Injector ) {
    super( injector );
    const ctrl = this;
    router.events.subscribe(e=>{

        ctrl.update();

    });
    this.update();
    //setTimeout(()=>{ ctrl.update(); },666);
  }

  ngOnChanges(changes){
    this.update();
  }

  get links(){
    return this.menuitems;
  }


  find( path: string ){
    return this.findRouteByPath(path, this.router.config );
  }

  update(){
    this.menuitems = [];

    const ctrl = this;
    if( this.path === '/' ){
      this.router.config.forEach(route=>{
        if( route.path !== '' && route.path != '**'){
          ctrl.menuitems.push( ctrl.toMenuitem( route, '/') );
        }
      })
    }else{
      const config = this.find( this.path );
      //alert(JSON.stringify(config));
      if( config && config.children ){
        config.children.forEach(route=>{
          if( !route['disabled'] && route.path !== '' && route.path != '**'){
            ctrl.menuitems.push( ctrl.toMenuitem( route, '/'+ctrl.path+'/' ) );
          }
        })
      }
    }


  }


  toMenuitem( route,prefix ){
    let icon,label,tooltip;
    if( route.component){
      //if( !route.component.icon ) console.warn( route.component.name + ' not define static icon property design will be damaged');
//      if( !route.component.label ) console.warn( route.component.name + ' not define static label property content will be damaged');
      icon=route.component.icon || 'folder';
      label=route.component.label || route.component.name;
      tooltip=route.component.tooltip||route.path;
    }else{
      icon='folder';
      label=route.path;
      tooltip=route.path;
    }
    const ctrl = this;
    const path = prefix+route.path;
    //console.log( path );
    //route.path = path;
    const menuitem = {
      icon:    icon,
      label:   label,
      tooltip: tooltip,
      path:    path,
      expanded: false,
      click:  ( evt: Event )=>{
        if( menuitem.children.length == 0 ){
          console.log( menuitem.children );
          const routes = path.split('/');
          console.log('routes',routes,path);
          ctrl.router.navigate(routes);
          //ctrl.select.emit(routes);
        }
        evt.preventDefault();

      },
      children: []
    };
    if( route.children ){
      route.children.forEach((pchildroute)=>{
        if ( !pchildroute['disabled'] && pchildroute.path.indexOf(':') == -1 && pchildroute.path !== '' && pchildroute.path !== '**' && pchildroute.component ){
          menuitem.children.push( this.toMenuitem( pchildroute, path+'/' ) );
        }
      });
    }
    return menuitem;

  }


  /**
   * Метод поиск маршрута по наименованию
   * @param path путь для поиска
   * @param routes маршруты
   */
  findRouteByPath( path: string, routes?: Routes ){
    if( !routes ){
      routes = this.router.config;
    }
    for ( let i = 0; i < routes.length; i++ ) {
      //console.log( path, routes[i].component.name );
      if ( routes[i].path === path ) {
        return routes[i];
      }
      if( routes[i].children ){
        let res = null;
        if( routes[i].children ){
          res = this.findRouteByPath( path, routes[i].children );
        }


        if( res )
          return res;

      }
    }
    return null;
  }


}
