import { AfterContentInit, Output, EventEmitter } from '@angular/core';
import { SimpleChanges} from '@angular/core';
import { Input} from '@angular/core';
import { Type} from '@angular/core';
import { Component} from '@angular/core';
import { OnInit} from '@angular/core';
import { OnChanges} from '@angular/core';
import { ElementRef} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Validators} from '@angular/forms';
import { of} from 'rxjs';
import { style} from '@angular/animations';
import { InputFormService} from './input-form.service';
import { description} from './annotations/description.function';
import { descriptor} from './annotations/descriptor.function';
import { inputTypes} from './annotations/input-types.const';
import { controlTypes} from './annotations/control-types.const';
import { structureTypes} from './annotations/structure-types.const';
import { validators} from './annotations/validators.const';







@Component({
  selector: 'input-form,app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  inputs: ['properties', 'title', 'actions', 'editable','exclude']
})
export class InputFormComponent
implements OnChanges, OnInit, AfterContentInit {

    @Input('enable-structures')
    enableStructures: boolean = true;

    exclude: string[] = [];

    constructor( public service: InputFormService,
                 public elementRef: ElementRef,
                 public formBuilder: FormBuilder  ) {
      window['form']=this;
    }

    static n = 1;

    editable = false;
    title    = 'PropertiesEditor';

    names: string[]  = [];
    properties: any = { id: 1 };
    proxy: any;
    descriptors: any;

    complete = false;

    editors: any = {};
    enabled =       false;

    actions: { [property: string]: (message: object)=>any } = { };

    @Output()
    validated = new EventEmitter();

    messages: {[property: string]: any} = {};
    errors: {[property: string]: any} = {};
    inputForm: any = [];
    groupItems: any = {};

    state: 'valid'|'invalid' = 'invalid';

    getActionNames(){
      return Object.getOwnPropertyNames(this.actions);
    }

    terminate(evt: Event ){
      /*evt.stopPropagation();
      evt.preventDefault();*/
    }

    onStatusChanged( status ){
      if (this.enabled = status.editable){
        Object.getOwnPropertyNames(this.inputForm.controls).forEach(name => {
          this.inputForm.controls[name].enable();
        });
      }else{
        Object.getOwnPropertyNames(this.inputForm.controls).forEach(name => {
          this.inputForm.controls[name].disable();
        });

      }
    }

    ngAfterContentInit(): void {
      const ctrl = this;
      ctrl.elementRef.nativeElement.id = ctrl.constructor.name + '_' + InputFormComponent.n;
      setTimeout(() => {
        const inputs: NodeListOf<any> = document.querySelectorAll( '#' + ctrl.elementRef.nativeElement.id + ' input' );
        for ( let i = 0; i < inputs.length; i++ ) {
          inputs[i].focus(  );
        }
      }, 350);
    }


    getErrorMessages( property: string ) {
      const messages = [];
      if ( this.inputForm.controls[ property ].errors ) {
        Object.getOwnPropertyNames( this.inputForm.controls[ property ].errors ).forEach(
          name => {
            messages.push({ name, message: this.inputForm.controls[ property ].errors[name] });
          }
        );
      }
      return messages;
    }

    parseNames( target ){
      return Object.getOwnPropertyNames(target);
    }

    ok() {
      if ( !this.actions.ok ) {
        throw new Error('action not defined');
      } else {
        // console.log('ok', this.action);
        /*this.action({
          status: 'submit',
          message: this.properties
        });*/
        this.actions.ok(this.properties);
      }
    }


    cancel() {
      if ( !this.actions.cancel ) {
        throw new Error('action not defined');
      } else {
        // console.log('ok', this.action);
        /*this.action({
          status: 'submit',
          message: this.properties
        });*/
        this.actions.cancel(this.properties);
      }
    }

    ngOnInit() {
      const ctrl = this;
      this.update();
      this.elementRef.nativeElement.addEventListener('focus', () => {
        ctrl.elementRef.nativeElement.classList.add('focused');
      });
      this.elementRef.nativeElement.addEventListener('blur', () => {
        ctrl.elementRef.nativeElement.classList.remove('focused');
      });
    }




    /** метод ввода данных */
    set( event ) {

      //console.log(this.properties);


      //console.log( event );
      if ( !event || !event.target || !event.target.name ) {
        throw new Error('event not define target element with name');
      }
      try {


        this.errors[ event.target.name ] = [];
        this.properties[ event.target.name ] = event.target.type==="checkbox"? event.target.checked: event.target.value;
        //  this.descriptors[event.target.name].model && this.descriptors[event.target.name].model.type==='checkbox' ?
        //    event.target.checked:
        //    event.target.value;



      } catch (e) {
        console.log(e);
        this.errors[ event.target.name  ] = this.errors[ event.target.name  ].concat( (e && e.message)? JSON.parse(e.message): e? JSON.parse(e): ('Unknown error while set property: '+event.target.name) );
      } finally {
        const isValideNow = this.validate();
        this.state = isValideNow? 'valid': 'invalid';
        this.validated.emit(isValideNow);
        if ( this.properties.update ) {
          this.properties.update();
        }
        console.log(this.properties);
        if( event && event.preventDefault )
          event.preventDefault();
        if( event && event.stopPropagation )
          event.stopPropagation();
      }
    }


    // наследование на уровне прототипов
    public extend( ref: any, proto: any ) {
      let pref = ref;
      while ( pref.__proto__.constructor.name !== 'Object' ) {
          pref = pref.__proto__;
      }
      const temp = pref.__proto__;
      pref.__proto__ = proto;
      proto.__proto__ = temp;
    }

    /** событие ввода входных параметров */
    ngOnChanges( changes: SimpleChanges ): void {
      if ( changes.properties ) {
        this.update();
      }
    }

    /**
     * обновление прототипа редактора
     */
    update() {

        const ctrl = this;
        this.descriptors = {};
        const formGroup = {};
        if ( !this.properties ) {
          this.names = [];

        } else {
          //console.log( this.properties );
          //console.log( this.properties.__descriptor__ );
          if( !this.properties.__descriptor__ ){
            ctrl.extend( this.properties, { __descriptor__: {}} );
          }
          console.log( this.properties);

          const names = Object.getOwnPropertyNames( this.properties ).filter(key=>{ return key!=='__descriptor__'; }).filter(n=>ctrl.exclude.indexOf(n)===-1);
          //alert(JSON.stringify(this.properties['__descriptor__']));
          for ( let i = 0; i < names.length; i++ ) {


            /**
             * если тип элемента ввода явно не указан в описании свойств __description__, то
             * при наличии значения(или ссылки), тип определяется по логическому имени свойства
             * например 'password: string' будет определен тип ввода password в противном случае
             * анализиется тип данных,
             * если значение не определено и нет явных указаний в __description__ то
             * появляется исключительная ситуация когда ввода данных невозможен
             */
            const name = names[i];

            ctrl.descriptors[name] = Object.assign(
            this.service.getDescription( this.properties, name),
            {
              options:    Object.getOwnPropertyDescriptor( this.properties, name ),
              model:      this.service.getInputModel( this.properties, name ),
              validators: this.service.getValidators( this.properties, name ),

            });


            // если тип элемента явно не указан, то определяем по логическому наименованию свойства
            if ( typeof( ctrl.descriptors[name].model ) === 'undefined' ) {
              const descriptor = inputTypes[name.toLocaleLowerCase()];

              if ( descriptor && descriptor != '' && typeof(descriptor)=='function' ) {
                console.log('descriptor',descriptor,typeof(descriptor));
                descriptor()( this.properties, name );
                ctrl.descriptors[name].model = this.service.getInputModel( this.properties, name );
              }
            }

            // определение по данным
            if ( typeof( ctrl.descriptors[name].model ) === 'undefined' ) {
              if ( typeof(this.properties[name])==='undefined' ) {
                console.warn( 'property ' + name + ' not declared its type of input and not define value and name logical not match any types of input');
              } else {
                const type = this.service.getType( this.properties, name );

                let annotationFn = null;
                if ( type ) {
                  annotationFn = inputTypes[ type ] || controlTypes[type] || structureTypes[type];
                }else{
                  throw new Error( 'not type for '+name+' value: '+this.properties[name]);
                }
                if( annotationFn ){//throw new Error('no annotation function for type: '+type);
                  annotationFn()(this.properties, name);
                }else if (typeof(this.properties[name]) === 'object') {
                  //alert( 'not annotationFn for '+name+' value: '+this.properties[name]);
                  if ( this.properties[name] instanceof Array) {
                    if ( this.properties[name].length > 0 ) {
                      if ( typeof(this.properties[name][0]) === 'object' ) {
                        const prototype = Object.assign({}, this.properties[name][0]);
                        structureTypes.array( prototype )( this.properties, name );
                      } else {
                        const elementType = this.service.getType( this.properties[name], 0 );
                        structureTypes.arrayOfPrimitive( elementType )( this.properties, name );
                      }
                    } else {
                      console.warn('array element type unknown');
                    }
                  } else {
                    structureTypes[typeof(this.properties[name])]()(this.properties, name);
                  }
                }
              }
            }
            // console.log( this.properties );
            ctrl.descriptors[name].model = this.service.getInputModel( this.properties, name );
            if ( typeof( ctrl.descriptors[name].model ) === 'undefined' ) {
              this.enabled = false;
              //console.log(ctrl.properties );
              //console.log(ctrl.descriptors[name]);
              throw new Error('can not create input elements for property ' + name + '');
            }
            if ( !ctrl.descriptors[name].validators ) {ctrl.descriptors[name].validators = []; }
            ctrl.descriptors[name].validators.push( function( value ){ if ( !ctrl.enabled ) {throw new Error('editing is disabled'); } } );
          }

          this.proxy = validators.create( this.properties );
          this.createPropertiesForm();
          this.names = names;
          this.enabled = true;
          this.validated.emit(this.validate());
        }
        setTimeout(()=>{
          ctrl.refresh();
        },100);
    }

    isValide(){
      const ctrl = this;
      Object.getOwnPropertyNames(this.errors).forEach(name=>{
        console.log( ctrl.errors[name] );
      });
      return false;
    }

    refresh(){
      const ctrl = this;
      this.names.forEach(name=>{
        ctrl.set({ target:{ name: name, value: ctrl.properties[name]} });
      });
    }


    getModelValidationState(){
      const ctrl = this;
      let result = 'VALID';
      this.names.forEach(name=>{
        if(ctrl.getPropertyValidationState(name)=='INVALID'){
          result = 'INVALID';
        }
      });
      return result;
    }
    getPropertyValidationState(name){
      return this.errors[name].length>0? 'INVALID': 'VALID';
    }



    /** выполнение проверки всех свойств */
    validate(  ) {
      const ctrl = this;
      let count = 0;
      this.names.forEach(name => {
        ctrl.errors[ name ] = [];
        const validators = ctrl.properties.__descriptor__[name].validators;
        if ( validators ) {
          validators.forEach(validator => {
            try {
              validator.bind(ctrl.properties)( ctrl.properties[ name ] );
            } catch ( e ) {
              ctrl.errors[ name ].push(e);
              count ++;
            }
          });
        }
        ctrl.inputForm.controls[name].status = ( ctrl.errors[name].length > 0 ) ? 'INVALID' : 'VALID';
      });
      this.inputForm.status = ( count !== 0 )? 'VALID': 'INVALID';
      return count == 0 ? false : true;
    }




    /**
     * Создание свойств formControl
     */
    private createPropertiesForm() {
      /*
      if (this.properties.__descriptor__) {
        const set = new Set(names.concat(Object.getOwnPropertyNames(this.properties.__descriptor__)));
        names = [];
        set.forEach((val) => { names.push(val); });
      }
      this.editors = {};*/
      const ctrl = this;
      const names = Object.getOwnPropertyNames(this.properties);
      for (let i = 0; i < names.length; i++) {
        this.groupItems[names[i]] = [ this.properties[names[i]] ];
        /*this.editors[this.names[i]] = {
          visible: (typeof(this.properties[this.names[i]]) !== 'object') && !(this.properties[this.names[i]] instanceof Array )
        };*/
      }

      this.inputForm = this.formBuilder.group(this.groupItems);
      this.inputForm.statusChanges.subscribe(() => {
        console.warn( 'status changed to: '+this.inputForm.status );
      });
    }





}








