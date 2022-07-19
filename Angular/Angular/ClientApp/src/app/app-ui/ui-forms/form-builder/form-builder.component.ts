import { validators } from 'src/app/app-ui/ui-forms/input-form/annotations/validators.const';
import { ColumnModel } from 'src/app/app-ui/ui-common/core-database/column-model';
import { specification } from 'src/app/app-ui/ui-common/specification.function';

import { textValidators } from './../input-form/annotations/validators/text-validators.const';

import { Component, OnInit, OnChanges, SimpleChanges, Injector } from '@angular/core';

import { inputTypes } from '../input-form/annotations/input-types.const';
import { structureTypes } from '../input-form/annotations/structure-types.const';
import { controlTypes } from '../input-form/annotations/control-types.const';

import { dateValidators } from '../input-form/date-validators.const';
import { numberValidators } from '../input-form/annotations/number-validators.const';
import { Controlable } from '../../ui-control/control-api/controlable';

function createCheckboxList( names: string[] ){
  const listModel = {};
  names.forEach(name=>{
    listModel[name] = false;
    controlTypes.checkbox()(listModel,name);
  })
  return listModel;
}

@specification({
  label:    'FormBuilder',
  icon:     'table',
  tooltip:  'FormBuilder constructs input form and can be connected to database builder to create data tables for input.'
})
@Component({
  selector: 'ui-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent
extends Controlable
implements OnInit, OnChanges {

  inputFormModel: any = null;

  propertyModel: any = new ColumnModel();
  cols = Object.getOwnPropertyNames(new ColumnModel());

  @structureTypes.array( new ColumnModel() )
  properties: ColumnModel[] = [     ];

  constructor(injector: Injector){
    super(injector);
  }



  validators = {
    string:   createCheckboxList(Object.getOwnPropertyNames(textValidators)),
    date:     createCheckboxList(Object.getOwnPropertyNames(dateValidators)),
    number:   createCheckboxList(Object.getOwnPropertyNames(numberValidators))
  }

  getProperties(){
    return this.properties;
  }

  trace(e){
    console.log(e);
  }

  create( model?: ColumnModel){
    const p = model? model: new ColumnModel();
    if( this.properties.indexOf(p)==-1 ){
      this.properties.push( p );
      this.properties = [ ].concat(this.properties);
    }
    this.inputFormModel = this.createPrototype();
    this.propertyModel = new ColumnModel();
    return true;
  }

  createPrototype(){
    const p = {};
    this.properties.forEach(prop=>{
      console.log(prop.name);
      p[prop.name]=prop.defaults;
      if( !prop.nullable ){
        validators.required( true )( p,prop.name );
      }
      const type = prop.type;

      let annotationFn = null;
      if ( type ) {
        annotationFn = inputTypes[ type ] || controlTypes[type] || structureTypes[type];
        annotationFn()(p, prop.name);

      }else{
        console.error( 'not type for '+prop.name+' value: '+this.properties[prop.name]);
      }
    });
    return p;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(Object.getOwnPropertyNames(changes));
  }









  // propertiesPrototype:{ [property: string]: ColumnModel}={
  //   name: new ColumnModel()
  // };

  // @structureTypes.array( { id:1, name: 2} )
  // properties: any[]=[  { id:1, name: 2} ]

  // propertyModel: ColumnModel = new ColumnModel();

  // constructor() { }

  // addProperty(   ){
  //   this.properties[ this.propertyModel.name ] = Object.assign( {},this.propertyModel.defaults );
  //   this.propertiesPrototype[ this.propertyModel.name ] = this.propertyModel.defaults;
  //   console.log( Object.getOwnPropertyNames( this.properties ) );
  //   //this.properties[this.propertyModel.name] = this.propertyModel.defaults;

  // }

  update(){

  }

  ngOnInit(): void {

  }

}
