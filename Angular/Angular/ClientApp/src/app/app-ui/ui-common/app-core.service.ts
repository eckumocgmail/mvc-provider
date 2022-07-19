import { async } from '@angular/core/testing';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IEvent } from './core-ievent';
import { Injectable } from '@angular/core';



/**
 * Базовый класс сервиса приложения выполняет передачу сообщений
 * о вызываемых функциях.
 */

export abstract class AppCoreService  {

  public appName = "EcKuMoC";
  public name = 'undefined';
  public terminateOnError = true;
  public logging = false;
  public securityMode = false;

  public hubUrl = 'https://localhost:5001';

  public parents:        AppCoreService[]=[];
  public history:        Array<IEvent> = [];
  public children:       AppCoreService[];


  constructor( args: IArguments,
        private type: 'retranslator'|'listener' = 'listener' ) {
    this.name = this.constructor.name.substring(0,1).toLocaleLowerCase()+this.constructor.name.substring(1);
    this.children = [];
    if( args ){
      this._init( args );
    }
    const proxy = new Proxy( this, this );
    if( this.securityMode ){
      return Object.seal( proxy );
    }else{
      //return proxy;
    }
  }

  get _root() {
    if( this.parents.length === 0 ){
      return <any>this;
    }else{
      return this.parents[0]._root;
    }
  }

  get _path(){

    let p = this;
    if( this.parents.length === 0 ){
      return this.name;
    }else{
      return this.parents[0]._path+'/'+this.name;
    }
  }



  onNgOnInit(message: IEvent){
  }

  protected _init( subservices: IArguments ){
    for( let i=0; i<subservices.length; i++ ){
      if( subservices[i] instanceof AppCoreService ){
        subservices[i].subscribe( this );
      }
    }
  }

  public subscribe( to_parents: AppCoreService ){
    this.parents.push( to_parents );
    to_parents.children.push( this );
    this.history.forEach((message: IEvent)=>{
      to_parents._emit( message );
    });
  }



  private _emit( message: IEvent ) {

      this.history.push( message );
      switch( this.type ){
        case 'retranslator':
          this._broadcast( message );

        case 'listener':
          for ( let i = 0; i < this.parents.length; i++ ) {
            this.parents[i]._emit( message );
          }
          break;
      }
  }


  private _broadcast( message: IEvent ){
      this._handle( message );
      for ( let i = 0; i < this.children.length; i++ ) {
        this.children[i]._broadcast( message );
      }
  }


  private _handle( message: IEvent ) {
      //console.log( this.constructor.name, message );
      if( this['on'+message.event.substr(0,1).toUpperCase()+message.event.substr(1)] ){
        this['on'+message.event.substr(0,1).toUpperCase()+message.event.substr(1)](message);
      }
  }








  get( target: any, property: string ){
    const ctrl = this;
    if( !property.toString().toLowerCase().startsWith('on') && property[0] != '_' ){

      const action = target[property];
      if( typeof(action)==='function' ){
          return function(){
            let result = null;
            let status: 'failed'|'success' = 'failed';
            let async = false;
            const started = new Date().getTime();
            try{
                result = action.apply( target, arguments );
                status = 'success';
            }catch(e){
                status = 'failed';
                result = e.message;
                console.log( target.constructor.name, property, e.message);
                if( this.terminateOnError ){
                    throw new Error(property+'Exception: '+ e );
                }
            }finally{
                if( !async ){
                  target._emit({
                      source: target,
                      status: status,
                      async:  false,
                      event:  property,
                      args:   arguments,
                      time:   started-new Date().getTime(),
                      value:  result,
                  });
                }else{
                  (<Observable<any>>result).pipe(
                    map((asyncResult)=>{
                      ctrl._emit({
                        source: target,
                        event:  property,
                        status:  status,
                        async:  true,
                        args:   arguments,
                        time:   started-new Date().getTime(),
                        value:  asyncResult,
                      });
                      return asyncResult;
                    }),
                    catchError((error)=>{

                      ctrl._emit({
                        source: target,
                        event:  property,
                        status:  'failed',
                        async:  true,
                        args:   arguments,
                        time:   started-new Date().getTime(),
                        value:  error,
                      });
                      return throwError(error);
                    })
                  );
                }
            }
            return result;
          }
      }else{
        return target[property];
      }
    }else{
      return target[property];
    }
  }

}
