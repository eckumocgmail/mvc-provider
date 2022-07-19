import { Component, Input, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  templateUrl: 'modal.component.html',
  selector: 'app-modal'
})
export class ModalComponent implements OnInit {

  static counter =1;
  id: number;

  @Input()
  title = 'Title';

  @Input()
  text = 'this is a test';

  @Output()
  show = new EventEmitter();

  @Output()
  hide = new EventEmitter();

  @ViewChild('powerButton',{static: true})
  powerButton: ElementRef;

  constructor() {
    this.id = ModalComponent.counter++;
  }

  ngOnInit() {
    const ctrl = this;
   
  }



  popup(){
    const ctrl = this;
    window['$']('#modal_'+this.id).modal();
    window['$']('#modal_'+this.id).on('show.bs.modal', function (e) {
      ctrl.show.emit(ctrl);
    });
    window['$']('#modal_'+this.id).on('hide.bs.modal', function (e) {
      ctrl.hide.emit(ctrl);
    });
  }

  ok(){
    window['$']('#modal_'+this.id).modal('hide');
  }

  cancel(){
    window['$']('#modal_'+this.id).modal('hide');
  }

  
   
}
