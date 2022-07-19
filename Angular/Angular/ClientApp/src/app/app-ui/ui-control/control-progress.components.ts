import { UiCommonComponent } from 'src/app/app-ui/ui-common/ui-common.component';

import { EventEmitter, Component, Input, Output, SimpleChanges, Injector } from "@angular/core";

@Component({
  selector: 'control-progress',
  template: `
    <div style="width: 220px; display: flex; flex-direction: row; flex-wrap: nowrap;" >

      <div>{{ value }}% {{ state }} {{ name }}
        <span class="progress">
          <span class="progress-bar"
              role="progressbar"
              [style.width]="value+'%'">
          </span>
        </span>
      </div>

    </div>

  `
})
export class ControlProgressComponent
extends UiCommonComponent
{

  @Input()
  name = 'loading';
  state: 'waiting'|'active'|'complete' = 'waiting';
  _value = 0;

  @Input()
  set value( val ){
    this._value = val;
    if( this._value == 0 ){
      this.started.emit(this);
    }else if (this._value == 100){
      this.completed.emit(this);
    }
  }
  get value(){
    return this._value;
  }

  @Output()
  started = new EventEmitter();
  @Output()
  completed = new EventEmitter();


  constructor(injector: Injector){
    super(injector);
    const ctrl = this;
    this.started.subscribe(()=>{
      ctrl.state = 'active';
    });
    this.completed.subscribe(()=>{
      ctrl.state = 'complete';
    });
  }

  ngOnInit() {
    this.inc();
  }

  ngOnChanges(changes: SimpleChanges): void{}

  inc(){
    const ctrl = this;
    setTimeout(()=>{
      if( ctrl.value < 100 ){
        ctrl.inc();
        ctrl.value++;
      }
    },10);
  }

}
