
import { FormFieldComponent } from './form-field.component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EntityRepositoryFactory } from 'src/app/app-core/core-data/entity-repository.factory';

@Component({
  selector: 'form-view',
  templateUrl: './form-view.component.html'
})
export class FormViewComponent implements OnInit {

  @Input()
  title = 'Login';

  @Input('show-toolbar')
  showToolbar = true;

  view = 1;
  size: 'norm'|'large'|'small'= 'norm';

  @Input()
  fields: FormFieldComponent[] = [
  ];
  state: 'valid'|'invalid'|'undefined' = 'valid';

  @Output()
  changed = new EventEmitter();

  @Output()
  uniqueValidation = new EventEmitter();

  validateUnique( property: string, value: any ){
    this.uniqueValidation.emit({
      property: property,
      value: value
    });
  }

  ngOnInit() {
    const ctrl = this;
    ctrl.validateFields();
    ctrl.updateState();
  }

  onSizeChanged(evt: Event){
    this.size = evt.target['value'];
    evt.preventDefault();
    evt.stopImmediatePropagation();
  }

  validateFields(){
    const ctrl = this;
    ctrl.fields.forEach(field=>{
      field.onValidate(ctrl, field.value);
    });
  }

  onInput( evt ){
    const field = this.fields.find(f=>f.name === evt.target.name);
    const value = evt.target.type === 'checkbox'? evt.target.checked: evt.target.value;
    field.onValidate( this, value );
    this.validateFields();
    this.updateState();
    this.changed.emit(this.getValues());
  }

  getValues(){
    const props = {};
    const ctrl = this;
    ctrl.fields.forEach(field=>{
      props[field.name]=field.value;
    });
    return props;
  }

  findField(fieldName: string){
    return this.fields.find(f=>f.name === fieldName);
  }

  updateState(){
    const ctrl = this;
    ctrl.state = 'undefined';
    ctrl.fields.forEach(field=>{
      if( field.state==='invalid'){
        ctrl.state = 'invalid';
      }
    });
    if(ctrl.state == 'undefined'){
      ctrl.state = 'valid';
    }
  }
}
