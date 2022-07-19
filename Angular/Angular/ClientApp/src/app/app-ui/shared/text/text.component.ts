import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html'
})
export class TextComponent implements OnInit {

  @Input()
  color: 'default'|'primary'|'success'|'info'|'warning'|'danger'|'white' = 'white';

  @Input()
  size = 1;

  @Input()
  bgcolor: 'default'|'primary'|'success'|'info'|'warning'|'danger'|'light'|'dark' = 'primary';

  @Input()
  text = 'this is a test';

  constructor() { }

  ngOnInit() {

    const ctrl = this;
    setInterval(()=>{
      ctrl.size++;
    },1000);
  }

  get classes(){
    return `p-3 mb-2 bg-${ this.bgcolor } text-${ this.color} display-${ this.size }`;
  }

}
