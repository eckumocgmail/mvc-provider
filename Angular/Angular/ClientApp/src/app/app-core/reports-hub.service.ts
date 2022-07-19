import { provider } from './mvc-provider';
import { AppControllerService } from './../app-controller.service';
import { HubConnection, HubConnectionBuilder, HttpTransportType, HubConnectionState } from '@microsoft/signalr';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ReportsHubService
{
  url: string = '/Reports';
  connection: HubConnection;
  constructor( private controller: AppControllerService ) {
    this.connect(this.url);
  }
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
      }

    }
  }

  getXml(reportId: number){
    return this.connection.invoke('GetXml',''+reportId);
  }
}
