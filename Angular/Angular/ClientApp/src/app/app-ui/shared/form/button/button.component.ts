import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html'
})
export class ButtonComponent {

  @Input()
  label  = 'ok';

  @Input()
  color: 'default'|'primary'|'success'|'info'|'warning'|'danger' = 'primary';

  @Input()
  size: 'lg'|'xs'|'sm' = 'sm';

  @Input()
  active = true;

  @Output()
  clicked = new EventEmitter();

  get classes() {
      const suffix =  (this.active) ? 'active' : 'disabled';
      return 'btn btn-' + this.color + ' btn-' + this.size + ' ' + suffix;
  }

}
