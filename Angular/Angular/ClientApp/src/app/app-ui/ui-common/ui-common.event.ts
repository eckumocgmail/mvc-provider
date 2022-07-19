import { UiCommonComponent } from './ui-common.component';

//событие контроллера
export class UiCommonEvent{


  public created: number;
  public state:   number;
  public accepted: Array<{ }> = [];

  constructor( public target: UiCommonComponent, public event: string, public action: any ){
    this.created = this.time();
    this.state = 0;
  }

  public handle( ctrl: UiCommonComponent ){
    if( typeof(this.action)==='function' ){
      this.accepted[ctrl.path] = this.action.apply(ctrl, [this]);
    }else if( typeof(this.action)==='string' ){
      this.state[this.action] = true;
    }
  }

  public time(){
    const pdate = new Date();
    return (pdate.getHours() * 60 * 60 * 1000) + (pdate.getMinutes() * 60 * 1000) + (pdate.getSeconds() * 1000) + pdate.getMilliseconds();
  }

}
