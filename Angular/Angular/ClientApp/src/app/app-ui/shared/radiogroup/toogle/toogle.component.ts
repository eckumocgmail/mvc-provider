import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toogle',
  templateUrl: './toogle.component.html',
  styleUrls: ['./toogle.component.css']
})
export class ToogleComponent implements OnInit {




  @Input()
  label  = 'ok';

  @Input()
  color: 'default'|'primary'|'success'|'info'|'warning'|'danger' = 'primary';

  @Input()
  size: 'lg'|'xs'|'sm' = 'xs';

  @Input()
  active = true;
  visible = false;
  value = false;
  classes = '';

  @Output()
  toogled = new EventEmitter();

  constructor(){


  }


  ngOnInit(){
    this.updateClasses();
    const ctrl = this;
    setTimeout(()=>{ ctrl.visible=true; },100);
  }

  updateClasses() {
      const suffix =  (this.value) ? (' btn-' + this.color) : '';
      this.classes = 'btn' + ' btn-' + this.size + ' ' + suffix;
  }

  toogle() {
      this.value = this.value==false? true: false;
      this.updateClasses();
      this.toogled.emit(this);
  }


}
