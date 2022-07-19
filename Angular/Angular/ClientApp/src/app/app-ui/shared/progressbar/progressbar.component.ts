import { Component, OnChanges, OnInit, Output, SimpleChanges, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent
implements OnInit, OnChanges {

  state: 'waiting'|'active'|'complete' = 'waiting';

  @Input()
  name = 'loading';

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


  constructor(){
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

  ngOnChanges(changes: SimpleChanges): void{

  }

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
