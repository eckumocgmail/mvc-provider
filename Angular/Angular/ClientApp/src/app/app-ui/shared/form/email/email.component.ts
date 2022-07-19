import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'email',
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
export class EmailComponent implements OnInit {

  @ViewChild('input',{static: true})
  input: ElementRef<HTMLInputElement>;

  @Input()
  value = 'eckumoc@gmail.com';

  @Output()
  changed = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.setValue(this.value);
  }

  onInput(evt){
    let email = evt.target.value;
    this.setValue(email);
  }

  setValue( email ){
    let value = email;
    if( this.value !== value ){
      this.changed.emit(this.value = value);
    }
  }

}
