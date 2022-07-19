import { DefaultContextMenuitem } from './default-context-menu.model';
import { ContextMenuItemModel } from './context-menu-item.model';
import { Component} from '@angular/core';
import { OnInit} from '@angular/core';

@Component({
    selector: 'app-context-menu-sample',
    template: '<app-context-menu></app-context-menu><button [appContextMenu]="contextmenu"> click right mouse button on me </button>'
})
export class ContextMenuSampleComponent
implements OnInit {
    contextmenu: Array<ContextMenuItemModel>;


    ngOnInit(): void {
      this.contextmenu = [];
      const sidenav = DefaultContextMenuitem.create({
        icon:   'settings_overscan',
        label:  'sidenav',
        menuitems: []
      });
      sidenav.menuitems.push(DefaultContextMenuitem.create({
        icon:   'view_day',
        label:  'line',
        menuitems: []
      }));
      sidenav.menuitems.push(DefaultContextMenuitem.create({
        icon:   'view_array',
        label:  'column',
        menuitems: []
      }));


      const flexbox = DefaultContextMenuitem.create({
        icon:   'checkbox_outline_blank',
        label:  'flexbox',
        menuitems: []
      });
      flexbox.menuitems.push(DefaultContextMenuitem.create({
        icon:   'view_column',
        label:  'columns',
        menuitems: []
      }));
      flexbox.menuitems.push(DefaultContextMenuitem.create({
        icon:   'view_headline',
        label:  'rows',
        menuitems: [],
        click( evt ) {
        }
      }));

      const view = DefaultContextMenuitem.create({
        icon: 'crop_free',
        label: 'view',
        menuitems: []
      });
      view.menuitems.push(DefaultContextMenuitem.create({
        icon:   'account_tree',
        label:  'tree',
        menuitems: [],
        click( evt ) {
        }
      }));
      view.menuitems.push(DefaultContextMenuitem.create({
        icon:   'apps',
        label:  'grid',
        menuitems: [],
        click( evt ) {
        }
      }));
      view.menuitems.push(DefaultContextMenuitem.create({
        icon:   'border_all',
        label:  'table',
        menuitems: [],
        click( evt ) {
        }
      }));

      const options = DefaultContextMenuitem.create({
        icon: 'settings',
        label: 'settings',
        click: ( evt ) => {

        }
      });

      this.contextmenu.push( sidenav );
      this.contextmenu.push( flexbox );
      this.contextmenu.push( view );
      this.contextmenu.push( options );
    }
}
