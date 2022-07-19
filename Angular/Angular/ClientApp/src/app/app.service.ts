import { AppControllerService } from './app-controller.service';
import { Injectable, OnInit } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable()
export class AppService {

  url: string = '/Users';
  connection: HubConnection;
  constructor( private controller: AppControllerService ) { }
  ngOnInit(context): void {
    this.connect(this.url).then(this.configureServicesAndRun(context)).catch((err)=>{
      console.error(err);
    });
  }
  connect(url: string) {
    const builder: HubConnectionBuilder = new HubConnectionBuilder();
    this.connection = builder.withUrl(url,{
        skipNegotiation:    true,
        logMessageContent:  false,
        transport:          HttpTransportType.WebSockets
    }).build();
    return this.connection.start();
  }
  configureServicesAndRun(context){
    const ctrl = this;
    return function(   ){
      console.log(ctrl.connection.state);
      if(ctrl.connection.state == HubConnectionState.Connected){

        //регистрация сервисов
        Object.getOwnPropertyNames(ctrl.controller.api).forEach((propertyName)=>{
          console.log('define action: '+propertyName);
          ctrl.connection.on(propertyName,( request )=>{
            const result = ctrl.controller.api[propertyName](request);
          });
        });
        ctrl.connection.invoke('OnInit','').then((response)=>{
          const message = JSON.parse(response);
          console.log(context);
          console.log(message);
          Object.getOwnPropertyNames(message).forEach((name)=>{
            context[name]=message[name];
          });
        });
      }

    }
  }
}
