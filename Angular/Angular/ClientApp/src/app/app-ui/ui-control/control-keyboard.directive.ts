import { ElementRef, OnInit, OnChanges, OnDestroy, SimpleChanges, Input } from '@angular/core';
import { Directive } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Directive({
  selector: '[controlKeyboard]'
})
export class ControlKeyboardDirective
{
  @Input()
  controlKeyboard: {[property: string]: Function} = {};
  keys: string[] = [];

  constructor( private elementRef: ElementRef ) {
    window['a']=this;
  }

  get element(){
    return(<HTMLElement>this.elementRef.nativeElement);
  }


  ngOnInit(): void {
    const ctrl = this;
    this.element.addEventListener('keydown', function( event: KeyboardEvent ){
      if(ctrl.keys.indexOf(event.code.toLowerCase())==-1){
        ctrl.keys.push(event.code.toLowerCase());
        ctrl.keys = ctrl.keys.sort();
      }
      ctrl.active();
    });
    this.element.addEventListener('keyup', function( event: KeyboardEvent ){
      ctrl.keys.splice(ctrl.keys.indexOf(event.code.toLowerCase()),1);
    });
  }

  active(){

    const todo = this.action;
    console.log( this.code, this.controlKeyboard, todo, this.code);
    if( todo ){
      todo();
      this.keys = [];
    }
  }

  get action(){
    const names = Object.getOwnPropertyNames(this.controlKeyboard);
    for(let i=0; i<names.length; i++){
      const targetKeyCodes = names[i].split('+').sort();
      console.log(this.toText(targetKeyCodes), this.toText(this.keys), this.keys);
      if( this.toText(targetKeyCodes) === this.toText(this.keys) ){
        return this.controlKeyboard[names[i]];
      }
    }
    return null;
  }

  toText(targetKeyCodes: string[]){
    let str = '';
    targetKeyCodes.forEach((keyCode)=>{
      str+='+'+keyCode;
    });
    return str.length>0? str.substr(1): str;
  }

  get code(){
    let str = '';
    this.keys.forEach((keyCode)=>{
      str+='+'+keyCode;
    });
    return str.length>0? str.substr(1): str;
  }
}
