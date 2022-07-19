import { Component, Input} from '@angular/core';

@Component({
    selector:     'app-checkbox',
    templateUrl:  './checkbox.component.html'
})
export class CheckboxComponent {

  @Input()
  label = 'Remember me';

  @Input()
  checked: boolean = false;

  onChange(evt){
    this.checked = evt.checked;
  }

}
