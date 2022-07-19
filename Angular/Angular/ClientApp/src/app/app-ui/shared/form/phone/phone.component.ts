import { Component, Input, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'phone',
  template: `
    <div class="form-group" align="left">
      <label><b>Номер телефона</b></label>
      <input (input)="onInput($event)"
             #input type="text" class="form-control"
             placeholder="Номер телефона">
      <b id="emailHelp" class="form-text text-muted">
        Необходимо указать номер телефона
      </b>
    </div>
  `,
  styles: [
  ]
})
export class PhoneComponent implements OnInit {

  @ViewChild('input',{static: true})
  input: ElementRef<HTMLInputElement>;

  @Input()
  value = '79043341124';

  @Output()
  changed = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.setValue(this.value);
  }

  onInput(evt){
    let phone = evt.target.value;
    this.setValue(phone);
  }

  setValue( phone ){
    let value = '';
    for( let i=0; i<phone.length; i++ ){
      if( "0123456789".indexOf(phone[i]) !== -1 ){
        value += phone[i];
      }
      if( value.length == 11 ){
        break;
      }
    }
    if( value.length>1 ) value = value.substr(0,1)+'-'+value.substring(1);
    if( value.length>5 ) value = value.substr(0,5)+'-'+value.substring(5);
    if( value.length>9 ) value = value.substr(0,9)+'-'+value.substring(9);
    this.input.nativeElement.value = value;
    if( this.value !== value ){
      this.changed.emit(this.value = value);
    }
  }

}
