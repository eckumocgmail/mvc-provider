import { ContextMenuItemModel } from './app-ui/ui-context/context-menu/context-menu-item.model';
import { UiCommonComponent } from 'src/app/app-ui/ui-common/ui-common.component';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DefaultContextMenuitem } from './app-ui/ui-context/context-menu/default-context-menu.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent  {
  contextmenu: Array<ContextMenuItemModel>;

  hideToolbar = false;
  keywords: string[] = [];
  showNav = false;
  @ViewChild('drawer',{static: true}) drawer: MatDrawer;
  onSearch(evt){
    console.log(evt);
  }
  onInputSearch(evt){
    console.log(evt);
  }
  onClickPerson(){
    console.log('onClickPerson');
  }
  onClickApps(){
    console.log('onClickApps');
  }
  needCloseOnMouseOut = false;
  onMouseOut(){
    if(this.needCloseOnMouseOut){
      this.needCloseOnMouseOut = false;
      this.drawer.opened = false;
    }
  }
  closeOnMouseOut(){
    this.needCloseOnMouseOut = true;
  }

  title = 'spb-app-template';

  items = [];
  optinal = [];



  transform(evt){
    //alert(JSON.stringify(evt));
  }

}
