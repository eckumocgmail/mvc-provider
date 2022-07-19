import { AppService } from 'src/app/app.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ControlMenuComponent } from './control-menu.component';
import { specification } from 'src/app/app-ui/ui-common/specification.function';
import { Router } from '@angular/router';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'control-navmenu',
  template: `
    <control-menu [color]="color" [icon]="icon" [label]="label" [menuitems]="menuitems"></control-menu>
  `,
  styles: [
  ]
})
export class ControlNavmenuComponent implements OnChanges {

  @Input()
  color: 'primary'|'secondary' = 'primary';

  @Input()
  path: string;

  icon: string;
  label: string = 'ok';

  menuitems: ControlMenuComponent[] = [];

  constructor(private router: Router,  private app: AppService ) { }

  ngOnChanges(changes: SimpleChanges): void {
      const routeConfig: any = this.findRouteByAbsolutelyPath( this.path );
      if( !routeConfig ){
        throw new Error('Route not found by path: '+this.path);
      }else{
        const ctrl = this;
        this.icon = routeConfig.component.icon;
        this.label = routeConfig.path;
        this.menuitems = [];

        if( routeConfig.children ){
          routeConfig.children.forEach((child=>{

            if( child.path !== '' && child.path != '**' ){
              ctrl.menuitems.push(
                Object.assign(
                  new ControlMenuComponent(),{
                    icon: child.component? child.component.icon: 'folder',
                    label: child.path,
                    path: ctrl.getAbsolutelyPath(child)
                  }
                )
              );
            }

          }));
        }
      }

  }

  getAbsolutelyPath(child: any): any {
    let path = '';
    let proute: any = child;
    while( proute ){
      path = '/'+proute.path + path;
      proute = proute.parent;
    }
    return path;
  }

  findRouteByAbsolutelyPath(path: string): any {

    if( !path.startsWith('/') ){
      throw new Error('Absolutely path should started with /');
    }else{
      const ids = path.substr(1).split('/');
      let proute: any = { children: this.router.config };
      for( let i=0; i<ids.length; i++ ){

        proute = proute.children.find(p=>p.path===ids[i]);
      }
      return proute;
    }
  }


}
