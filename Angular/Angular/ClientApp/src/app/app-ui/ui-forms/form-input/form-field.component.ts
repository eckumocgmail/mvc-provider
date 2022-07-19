import { FormViewComponent } from './form-view.component';
import { EntityRepositoryFactory } from './../../../app-core/core-data/entity-repository.factory';
import { DoCheck } from "@angular/core";
import { OnChanges, SimpleChanges } from "@angular/core";
import { Component, Input } from "@angular/core";
import { ApplicationDbContext } from 'src/app/app-core/core-data/application.entity-fasade';

@Component({
  selector: 'form-field',
  template: `
    <div *ngIf="view==1" (input)="onInput($event)"  [hidden]="type==='hidden'">
      <label [attr.for]="name">
        {{label}}
        <span *ngIf="badge" class="badge badge-secondary" >{{badge}}</span>
      </label>

      <div class="input-group mb-5" >
        <div style="display: flex; flex-direction: row; flex-wrap: nowrap; width: 100%;">
          <div class="input-group-prepend">
                <span class="input-group-text">
                    <i class="material-icons">{{icon}}</i>
                </span>
            </div>
            <div style="width: 100%;">
              <input [attr.id]="name" [attr.name]="name" [attr.type]="type" [attr.class]="class" [attr.placeholder]="label" [attr.value]="type!=='date'? value: toInputForm( value )"
                  style="width: 100%;">
            </div>
          </div>
          <div class="text-info">{{help}}</div>
          <div *ngFor="let error of errors" class="text-danger">
            {{error}}
          </div>

        </div>
    </div>
    <div *ngIf="view==2">
      <div (input)="onInput($event)" [hidden]="type==='hidden'">
        <div class="form-group row">
          <div class="col-4 col-form-label" align="center"><label [attr.for]="name">{{label}}</label></div>
          <div class="col-8">
            <input style="width: 100%;" [attr.id]="name" [attr.name]="name" [attr.type]="type" [attr.class]="class" [attr.placeholder]="label" [attr.value]="type!=='date'? value: toInputForm( value )">
            <div class="form-text text-info ">{{help}}</div>
            <div *ngFor="let error of errors" class="text-danger">
              {{error}}
            </div>
          </div>
        </div>

      </div>
    </div>
    <div *ngIf="view==3">
      <div class="form-group" align="left" (input)="onInput($event)" [hidden]="type==='hidden'">
        <label><b>{{label}}</b></label>
        <input style="width: 100%;" [ngModel]="value" [attr.id]="name" [attr.name]="name" [attr.type]="type"  [attr.class]="class" [attr.placeholder]="label">
        <div class="text-info">{{help}}</div>
        <div *ngFor="let error of errors" class="text-danger">
          {{error}}
        </div>
      </div>
    </div>
  <!-- -->
  `
})
export class FormFieldComponent
implements OnChanges
{

  @Input()
  view = 1;

  @Input()
  badge = null;
  @Input()
  entity = null;

  @Input()
  size: 'large'|'norm'|'small' = 'norm';
  @Input()
  type: 'text'|'number'|'password'|'date' |'hidden'|'file' = 'text';
  @Input()
  name = 'noname';
  @Input()
  value = null;
  @Input()
  icon = 'person';
  @Input()
  label = 'noname';
  @Input()
  mapped = true;
  @Input()
  required: string = null;
  @Input()
  state: 'valid'|'invalid'|'undefined' = 'valid';
  @Input()
  help = '';
  @Input()
  class = 'form-control form-control-lg is-valid';
  @Input()
  errors: string[] = [

  ];
  @Input()
  validators: Function[] = [];
  @Input()
  transform: Function;
  @Input()
  unique: string = null;

  isControl = false;
  @Input()
  control:
    { type: 'textarea', oninit?: (ctrl)=>void }  |
    { type: 'icon', options: { text: string, value: string }[ ], oninit?: (ctrl)=>void}  |
    { type: 'radiogroup', options: { text: string, value: string }[ ], oninit?: (ctrl)=>void}  |
    { type: 'selectbox', options: { text: string, value: string }[ ], oninit?: (ctrl)=>void}  |
    { type: 'checkbox', oninit?: (ctrl)=>void }


  context: ApplicationDbContext;


  constructor( context?: ApplicationDbContext ){
    this.context = context;
  }


  onValidate( form: FormViewComponent, value ){
    const ctrl = this;
    ctrl.errors = [];
    if( ctrl.required && (!value || value=='')){
      ctrl.errors.push(ctrl.required);
    }else{
      if( ctrl.unique ){

        //TODO: validate unique
        form.validateUnique(ctrl.name, value);
      }
      ctrl.validators.forEach(validator=>{
        try{
          validator(form,this,value);
        }catch(e){
          ctrl.errors.push(e.message);
        }
      });
    }
    ctrl.value = value;
    ctrl.updateClass();
  }

  updateClass(){
    const ctrl = this;
    ctrl.state = ctrl.errors.length>0? 'invalid': 'valid';
    const sizeClass = ctrl.size==='large'? 'form-control-lg': ctrl.size=='norm'? '': ctrl.size=='small'? 'form-control-sm': '';
    ctrl.class = 'form-control '+sizeClass+' is-'+ctrl.state;
  }



  onInput($event){
    if(this.transform){
      $event.target.value = this.transform($event.target.value);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const ctrl = this;
    if(changes.size){
      ctrl.updateClass()

    }
  }


  toInputForm( date: any ){
    if( !(date instanceof Date) ){
      date = new Date(date.toString());
    }
    const mstr = (date.getMonth()+1)<10? ('0'+(date.getMonth()+1)): (date.getMonth()+1).toString();
    const dstr = date.getDate()<10? ('0'+date.getDate()): date.getDate().toString();
    return date.getFullYear()+'-'+mstr+'-'+dstr;
  }
}
