import { ToogleComponent } from './toogle/toogle.component';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radiogroup',
  templateUrl: './radiogroup.component.html'
})
export class RadiogroupComponent implements OnInit {

  options = [ 'book','journal' ];
  selected: ToogleComponent;

  constructor() { }

  ngOnInit() {
  }

  onToogled(evt, option){
    console.log( evt );
    if( this.selected ){
      this.selected.value = false;
      this.selected.updateClasses();
    }
    this.selected = evt;
  }
}
