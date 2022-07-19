import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, RouterEvent, RoutesRecognized, RouteConfigLoadStart } from '@angular/router';

@Component({
  selector: 'feature-nav',
  template: `
    <app-tree [nodelist]="menuitems" [selectable]="true" [title]="title" (select)="navigate($event)">
    </app-tree>
  `,
  styles: [
  ]
})
export class FeatureNavComponent implements OnInit {

  @Output() select = new EventEmitter();

  title: string = FeatureNavComponent.name;
  menuitems: Array<{
    icon:       string;
    label:      string;
    path:       string;
    children:  Array<any>;
  }>=[];

  constructor( private router: Router ){
    const ctrl = this;
    this.router.events.subscribe(( event: RouterEvent )=>{
        ctrl.update();
    });
  }

  navigate(evt){
    console.log('navigate',evt);
  }

  ngOnInit(): void {
    this.update();
    const ctrl = this;
    setTimeout(()=>{ctrl.update();},2000);
  }

  update(){
    //console.log('update');
    this.menuitems = [];
    const ctrl = this;
    this.router.config.forEach(route=>{
      //console.log(route.path);
      if( route.path !== '' && route.path.indexOf(':')===-1 && route.component  && route.path != '**'){
        ctrl.menuitems.push( ctrl.toMenuitem( route, '/' ) );
      }
    })
  }

  updatePublic(){
    //console.log('updatePublic');
    this.menuitems = [];
    const publicRoute = this.router.config.find((item)=>{
      return item.path==='Public';
    });
    if( !publicRoute ){
      throw new Error('Can not create navigation Public module undefined at router configuration');
    }
    const ctrl = this;
    publicRoute.children.forEach(route=>{
      if( route.path !== '' && route.path != '**'){
        ctrl.menuitems.push( ctrl.toMenuitem( route, 'Public/' ) );
      }
    })
  }

  toMenuitems( routes?: any[] ){
    if( !routes ) return this.toMenuitems(this.router.config);
    const ctrl = this;
    const menuitems = [];
    routes.forEach(route=>{
      let routeParams = route;
      if( !routeParams.path ){
        routeParams = { path: routeParams.name, component: routeParams };
      }
      menuitems.push( ctrl.toMenuitem( routeParams, '/' ) );
    });
    return menuitems;
  }

  toString( ids: string[], separator: string ){
    let label: string = '';
    ids.forEach(id=>{
      label += id + separator;
    });
    if( ids.length > 0 ){
      label = label.substr( 0, label.length-separator.length);
    }
    return label;
  }

  toMenuitem( route, prefix ) {
   // if ( !route.component.icon ) { console.warn( route.component.name + ' not define static icon property design will be damaged'); }
   // if ( !route.component.label ) { console.warn( route.component.name + ' not define static label property content will be damaged'); }
    const ctrl = this;
    const path = prefix + route.path;
    let ids: string[] = this.splitCapitalizedNamed(route.component.name);
    ids = ids.filter(id=>{ return id!=='Component'; });
    //const label: string = this.toString( ids, ' ' );
    const label: string = route.path;
    // console.log( path );
    // route.path = path;
    const menuitem = {
      icon:    route.component.icon || 'folder',
      label:   route.component.label,
      tooltip: route.component.tooltip,
      path:    path,
      expanded: false,
      click:  ( evt: Event ) => {
        if ( menuitem.children.length == 0 ) {
          const routes = path.split('/');
          console.log('routes', routes, path);
          ctrl.router.navigate(routes);
          ctrl.select.emit(routes);
        }
        evt.preventDefault();

      },
      children: []
    };
    if ( route.children ) {
      route.children.forEach((pchildroute) => {
        if ( pchildroute.path !== '' && pchildroute.path !== '**' && pchildroute.path.indexOf(':') === -1 && pchildroute.component ) {
          menuitem.children.push( this.toMenuitem( pchildroute, path + '/' ) );
        }
      });
    }
    return menuitem;
  }

  splitCapitalizedNamed(name: string): string[] {
    const ids: string[] = [];
    let s = '';
    for( let i=0; i<name.length; i++){
      if( i!==0 && i!==(name.length-1) && name[i] === name[i].toUpperCase() ){
        ids.push(s);
        s='';
      }
      s += name[i];
    }
    if( name.length > 0 ){
      ids.push(s);
    }
    return ids;
  }
}
