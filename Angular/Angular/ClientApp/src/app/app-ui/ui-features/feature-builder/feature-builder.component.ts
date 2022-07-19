import { specification } from 'src/app/app-ui/ui-common/specification.function';
import { validators } from 'src/app/app-ui/ui-forms/input-form/annotations/validators.const';
import { Injector, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';

import { Controlable } from '../../ui-control/control-api/controlable';
import { controlTypes } from '../../ui-forms/input-form/annotations/control-types.const';
import { numberValidators } from '../../ui-forms/input-form/annotations/number-validators.const';
import { structureTypes } from '../../ui-forms/input-form/annotations/structure-types.const';
import { textValidators } from '../../ui-forms/input-form/annotations/validators/text-validators.const';
import { dateValidators } from '../../ui-forms/input-form/date-validators.const';
import { inputTypes } from '../../ui-forms/input-form/annotations/input-types.const';
import { ColumnModel } from 'src/app/app-ui/ui-common/core-database/column-model';



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
  selector: 'feature-builder',
  templateUrl: './feature-builder.component.html',
  styles: [
    `
    .selected{
      background-color: black;
      color: white;
    }

    `
  ]
})
export class FormBuilderComponent
extends Controlable{



  inputFormModel: any = null;

  propertyModel: any = new ColumnModel();
  cols = Object.getOwnPropertyNames(new ColumnModel());

  @structureTypes.array( new ColumnModel() )
  properties: ColumnModel[] = [     ];

  constructor( private injector: Injector ){
    super( injector );
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
        console.error( 'not type for '+name+' value: '+this.properties[name]);
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
