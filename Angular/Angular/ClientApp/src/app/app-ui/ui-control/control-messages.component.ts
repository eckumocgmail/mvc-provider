import { UiCommonComponent } from './../ui-common/ui-common.component';
import { Component, OnInit, ViewChild, Injector, Input } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { AppService } from 'src/app/app.service';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'control-messages',
  template: `

    <div style="padding-left: 10px; padding-right: 10px;">
      <mat-menu #messagesMenu = "matMenu">
        <button mat-menu-item *ngFor="let message of messages">{{message}}</button>
      </mat-menu>
      <div>
        <button mat-raised-button (click)="onClickMessage()"  [matMenuTriggerFor]="messagesMenu">
          <mat-icon [matBadge]="countOfMessages"> message </mat-icon>
        </button>

      </div>

    </div>
  `,
  styles: [
  ]
})
export class ControlMessagesComponent
extends UiCommonComponent
implements OnInit {

  @Input() countOfMessages = 1;
  @Input() messages = [  ];
  @Input() closed = true;
  @Input() timeout = 3600;

  @ViewChild( 'messagesMenu',{static: true} ) messagesMenu: MatMenu;


  constructor( injector: Injector  ) {
    super( injector );
  }

  ngOnInit(): void {
    super.ngOnInit();
    const ctrl = this;
    this.messagesMenu.closed.subscribe(()=>{
      ctrl.closed = true;
    })
  }


  open(){
    document.getElementById('bmessagesMenu').click();
    this.closed = false;
  }

  close(){
    if( !this.closed ){
      document.getElementById('bmessagesMenu').click();
      this.closed = true;
    }
  }

  push( message ){
    const ctrl = this;
    this.messages.push( message );
    ctrl.open();
    setTimeout(()=>{
      ctrl.messages.splice(ctrl.messages.indexOf(message),1);
      if( ctrl.messages.length === 0 ){
        ctrl.close();
      }
    },ctrl.timeout);
  }

  onClickMessage(){
    //this.injector.get( AppService )
    throw new Error('show message not supported')
  }

}
