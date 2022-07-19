import { state } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
      <div [ngClass]="class" role="status" (click)="onClick($event)">
        <span class="sr-only">{{ status }}</span>
      </div>
  `,
  styles: []
})
export class SpinnerComponent implements OnInit {

  @Input()
  status = 'waiting';

  @Input()
  marker: any = 'dark';
  markers = [ 'primary','secondary','success','danger','warning','info','dark','light'];


  class = '';

  constructor(){ }

  ngOnInit() {
    this.update();
  }

  update(){
    this.class = 'spinner-border text-'+this.marker;
  }

  onClick(evt){
    const states = [ 'primary','secondary','success','danger','warning','info','dark','light'];
    this.marker = states[ Math.floor(Math.random()*state.length) ];
    this.update();
  }

}
