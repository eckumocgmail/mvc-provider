import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selectbox',
  templateUrl: './selectbox.component.html'
})
export class SelectboxComponent   {

  @Input()
  multi = false;

  @Input()
  options  = [ 'table', 'tree', 'grid' ];
  value: any = 'table';

  @Input()
  selected: any = this.value;

  @Output()
  onChanged = new EventEmitter();

  doChanges( evt ){
    console.log( evt );
    this.onChanged.emit(this.value = evt);
  }

}
