import { FormViewComponent } from './form-view.component';
import { Component, Input } from "@angular/core";
import { FormFieldComponent } from "./form-field.component";
import { ApplicationDbContext } from 'src/app/app-core/core-data/application.entity-fasade';
import { OnInit } from '@angular/core';

@Component({
  selector: 'form-control',
  template: `

    <div *ngIf="view==1" (input)="onInput($event)"   >
      <label [attr.for]="name">
        {{label}}
        <span *ngIf="badge" class="badge badge-secondary" >{{badge}}</span>
      </label>

      <div class="input-group mb-5" >
        <div style="display: flex; flex-direction: row; flex-wrap: nowrap; width: 100%;">
          <div class="input-group-prepend">
            <span class="input-group-text">
                <i class="material-icons">{{control.type!=='icon'?icon: value? value: 'home'}}</i>
            </span>
          </div>
          <div style="width: 100%;">
            <textarea [attr.class]="class"  *ngIf="control.type==='textarea'"
                      [attr.name]="name" [attr.id]="name" style="width: 100%;">{{value}}</textarea>
            <select [attr.class]="class"  *ngIf="control.type==='selectbox'"
                    [attr.name]="name" [attr.id]="name" style="width: 100%;">
              <option *ngFor="let option of control['options']" [attr.value]="option.value">{{option.text}}</option>
            </select>
            <select [attr.class]="class"  *ngIf="control.type==='icon'"
                    [attr.name]="name" [attr.id]="name" style="width: 100%;">
              <option *ngFor="let option of control['options']" [attr.value]="option.value">{{option.text}}</option>
              <option selected [attr.value]="value.toString()">{{value.toString()}}</option>
            </select>

            <div class="form-check"  *ngIf="control.type==='checkbox'"  style="width: 100%;">
              <input [attr.class]="class" type="checkbox" [attr.name]="name" [attr.id]="name" [attr.checked]="value">
              <label class="form-check-label" [attr.for]="name">{{label}}</label>
            </div>
            <div class="form-check"  style="width: 100%;" *ngIf="control.type==='radiogroup'">
              <div *ngFor="let option of control['options']">
                <input [attr.class]="class" type="radio" [attr.name]="name" [attr.id]="name" [attr.value]="option.value">
                <label class="form-check-label" [attr.for]="name" >{{ option.text }}</label>
              </div>
            </div>

          </div>
        </div>
        <div class="text-info">{{help}}</div>
        <div *ngFor="let error of errors" class="text-danger">
          {{error}}
        </div>

      </div>
    </div>
    <div class="form-group row" *ngIf="view==2" (input)="onInput($event)">
      <div class="col-4 col-form-label" align="center">
        <label [attr.for]="name">{{label}}</label>
      </div>
      <div class="col-8">
        <textarea [attr.class]="class"  *ngIf="control.type==='textarea'"
                      [attr.name]="name" [attr.id]="name" style="width: 100%;">{{value}}</textarea>
        <select [attr.class]="class"  *ngIf="control.type==='selectbox'"
                [attr.name]="name" [attr.id]="name" style="width: 100%;">
          <option *ngFor="let option of control['options']" [attr.value]="option.value">{{option.text}}</option>
        </select>
        <select [attr.class]="class"  *ngIf="control.type==='icon'"
                [attr.name]="name" [attr.id]="name" style="width: 100%;">
          <option *ngFor="let option of control['options']" [attr.value]="option.value">  {{option.text}} </option>
          <option selected [attr.value]="value.toString()">{{value.toString()}}</option>
        </select>
        <div class="form-check"  *ngIf="control.type==='checkbox'"  style="width: 100%;">
          <input [attr.class]="class" type="checkbox" [attr.name]="name" [attr.id]="name" [attr.checked]="value">
          <label class="form-check-label" [attr.for]="name">{{label}}</label>
        </div>
        <div class="form-check"  style="width: 100%;" *ngIf="control.type==='radiogroup'">
          <div *ngFor="let option of control['options']">
            <input [attr.class]="class" type="radio" [attr.name]="name" [attr.id]="name" [attr.value]="option.value">
            <label class="form-check-label" [attr.for]="name" >{{ option.text }}</label>
          </div>
        </div>
        <div class="form-text text-info ">{{help}}</div>
        <div *ngFor="let error of errors" class="text-danger">
          {{error}}
        </div>
      </div>
    </div>


    <div *ngIf="view==3" (input)="onInput($event)">
      <div class="form-group" align="left" (input)="onInput($event)" [hidden]="type==='hidden'">
        <label *ngIf="control.type!=='checkbox'"><b>{{label}}</b></label>
        <textarea [attr.class]="class"  *ngIf="control.type==='textarea'"
                      [attr.name]="name" [attr.id]="name" style="width: 100%;">{{value}}</textarea>
        <select [attr.class]="class"  *ngIf="control.type==='selectbox'"
                [attr.name]="name" [attr.id]="name">
          <option *ngFor="let option of control['options']" [attr.value]="option.value">{{option.text}}</option>
        </select>
        <div class="form-check"  *ngIf="control.type==='checkbox'">
          <input [attr.class]="class" type="checkbox" [attr.name]="name" [attr.id]="name" [attr.checked]="value">
          <label class="form-check-label" [attr.for]="name">{{label}}</label>
        </div>
        <select [attr.class]="class"  *ngIf="control.type==='icon'"
                [attr.name]="name" [attr.id]="name" style="width: 100%;">
          <option *ngFor="let option of control['options']" [attr.value]="option.value">
            {{option.text}}
          </option>
          <option selected [attr.value]="value.toString()">{{value.toString()}}</option>
        </select>
        <div class="form-check"  *ngIf="control.type==='radiogroup'">
          <div *ngFor="let option of control['options']">
            <input [attr.class]="class" type="radio" [attr.name]="name" [attr.id]="name" [attr.value]="option.value">
            <label class="form-check-label" [attr.for]="name" >{{ option.text }}</label>
          </div>
        </div>
        <div class="text-info">{{help}}</div>
        <div *ngFor="let error of errors" class="text-danger">
          {{error}}
        </div>
      </div>
    </div>

  `
})
export class FormControlComponent
extends FormFieldComponent
implements OnInit
{

  view = 1;

  @Input()
  control:
    { type: 'textarea', oninit?: (ctrl: FormControlComponent)=>void }  |
    { type: 'radiogroup',
      options: { text: string, value: string }[ ],
      oninit?: (ctrl: FormControlComponent)=>void }  |
    { type: 'icon',
      options: { text: string, value: string }[ ],
      oninit?: (ctrl: FormControlComponent)=>void }  |
    { type: 'selectbox',
      options: { text: string, value: string }[ ],
      oninit?: (ctrl: FormControlComponent)=>void }  |
    { type: 'checkbox',
      oninit?: (ctrl: FormControlComponent)=>void }

  constructor( context?: ApplicationDbContext ){
    super();
    this.isControl = true;
    this.context = context;
  }
  ngOnInit(): void {
    const ctrl = this;
    if(this.control.oninit){
      this.control.oninit(this);
    }
  }

  onInput($event){
    console.log($event);

  }

  onValidate( form: FormViewComponent, value: any ){
    super.onValidate( form, value );

    form.findField(this.name);
  }

  updateClass(){
    if( this.control.type === 'checkbox'){
      this.class = 'form-check-input is-'+this.state;
    }else{
      super.updateClass();
    }
  }
}
