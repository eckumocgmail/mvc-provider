import { EventEmitter, Component, OnInit, OnDestroy, DoCheck, IterableDiffer, Injector, Output, ElementRef, IterableChangeRecord, IterableDiffers, AfterViewInit } from '@angular/core';
import { AbstractComponent } from 'src/app/app-ui/ui-common/core-abstract/abstract-component';
import { UiEvent } from './ui-event';


@Component({
  selector: 'ui-common',
  template: `
    <p>
      ui-common works!
    </p>
  `,
  styles: [
  ]
})
export class UiCommonComponent
implements OnInit, OnDestroy, DoCheck, OnDestroy, AfterViewInit {

  path: string = '';
  id: string = '';




  protected protoNodes: object[] = [  ];
  private   protoRoot: {} = {};
  private   protoDiffer: IterableDiffer<any>;
  private   component: AbstractComponent;
  protected injector: Injector;
  protected childNodes: UiCommonComponent[] = [];


  process = [];

  @Output() init = new EventEmitter();
  @Output() change = new EventEmitter();
  @Output() destroy = new EventEmitter();

  constructor( injector: Injector ) {

    try{
      //this.component = this.constructor['get']();

      this.injector = injector;
      //this.id = this.constructor.name;

    }catch(e){
      console.log(this,e);
    }

    //return new Proxy(this,this);
  }



  get( target: any, property: string ){
    if( !property.toString().toLowerCase().startsWith('on') && property[0] != '_' ){

      const action = target[property];
      if( typeof(action)==='function' ){
          return function(){
            let result = null;
            let status = 'failed';
            const started = new Date().getTime();
            try{
                this.process.push(property);
                //console.log( target.constructor.name, property, arguments );
                result = action.apply( target, arguments );
                status = 'success';
            }catch(e){
                result = e.message;
                //console.log( target.constructor.name, property, e.message);
                if( this.terminateOnError ){
                    throw new Error(property+'Exception: '+ e );
                }
            }finally{
                this.process = this.process.splice(this.process.indexOf(property),1);
                target._emit({
                    source: target,
                    event:  property,
                    args:   arguments,
                    time:   started-new Date().getTime(),
                    value:  result,
                });
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

  rootNode(){
    let pparent: UiCommonComponent = this;
    let pnode: UiCommonComponent = this;
    do{
      pnode = pparent;
      pparent = pnode.parentNode();
    }while(pparent);
    return pnode;
  }

  domNode(): HTMLElement {
    return <HTMLElement>this.injector.get(ElementRef).nativeElement;
  }

  initNode(){
    const p=this.domNode();
    if(p)p['ctrl'] = this;
    const pparent = this.parentNode();
    if( pparent ){
      pparent.childNodes.push( this );
    }
    //console.log( this+'', this.rootNode()+'' );
  }

  /**
   * Получение компонента, с родительским DOM-узелом
   */
  parentNode(): UiCommonComponent{
    try{
      let pnode = this.domNode();
      if( pnode['ctrl'].constructor.name == 'AppComponent' ){
        return null;
      }else{
        do{
          pnode = pnode.parentElement;
          if( pnode['ctrl'] ){
            return pnode['ctrl'];
          }
        }while( pnode && !Object.is(pnode,document.body) );
      }
    }catch(e){
      console.error(this.constructor.name + ' ' + e);
    }

  }

  initProtos(){
    this.protoDiffer = this.injector.get(IterableDiffers).find(this.protoNodes).create(()=>{
      //console.log();
    });
  }

  //наследование прототипа
  public extend( p, proto: any ){
    let pref = p;
    while( pref['__proto__'] && pref['__proto__']['constructor'].name !== 'Object' ){
        pref = pref['__proto__'];
    }
    pref['__proto__'] = proto;
  }

  updateProtos(){
    let _proto = {};
    const ctrl = this;
    this.protoRoot['__proto__'] = _proto;
    this.protoNodes.forEach(proto=>{
      ctrl.extend( _proto, proto );
    });
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.change.emit(changes);
  }

  ngDoCheck(): void {
    const ctrl = this;
    if( !this.protoDiffer ){
      //throw new Error(this.constructor.name+' has not been initiallized');
      return;
    }
    const classChanges = this.protoDiffer.diff(this.protoNodes);
    if (classChanges) {
      classChanges.forEachAddedItem((record: IterableChangeRecord<any>) => {
        ctrl.updateProtos();
      });
      classChanges.forEachRemovedItem((record: IterableChangeRecord<any>) => {
        ctrl.updateProtos();
      });
    }
  }


  isRoot(){
    return this.constructor.name == 'AppComponent';
  }

  /**
   * Определение индекса
   */
  discovery(){

    let p: UiCommonComponent = this;
    this.path = p.id;
    do{
      p = p.parentNode();
      if( p ){
        this.path += '-' + p.id;
      }else{
        break;
      }
    }while( true );
    //console.log( this.id, this.path );
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.initNode();

    this.initProtos();

    this.extend( this, this.protoRoot );

    this.protoNodes = this.parentNode()? this.protoNodes.concat( this.parentNode().protoNodes): [] ;
    this.initGlobal();

    this.init.emit( this);

    if( this.constructor['ngOnInit'] ){

      this.ngOnInit = this.constructor['ngOnInit'];
      this.ngOnInit();
    }
  }

  initGlobal(){
    //console.log( this.constructor.name, '['+this.id+']', '['+this.path+']' );
    this.discovery();
    this.rootNode().protoNodes[this.path] = this;
  }

  destroyGlobal(){}

  ngOnDestroy(){
    const pparent = this.parentNode();
    if( pparent ){
      pparent.childNodes.splice( pparent.childNodes.indexOf(this),1 );
    }
    this.destroyGlobal();
    this.destroy.emit(this);
  }

  toString(){
    return '['+this.constructor.name+']';
  }



  /// EVENTS //////////////////////////////

  //выполнение операции всеми потомками и потомками потомков
  public sendHost( action: Function ){
    const ctrl = this;
    this.preLinking(function(message: UiEvent){
      if( this.path.startsWith(ctrl.path) ){
        return action.apply(this,message);
      }
      return null;
    });
  }

  //выполнение операции всеми потомками и потомками потомков
  public sendChildren( action: Function ){
    const ctrl = this;
    this.preLinking(function(message: UiEvent){
      if( Object.is(this.parent,ctrl) ){
        return action.apply(this,message);
      }
      return null;
    });
  }

  //передача сообщения
  public send( type: string, ref: any ){
    const message = new UiEvent( this, type, ref );
    this.on( message );
  }

  //нисходящее передача сообщения
  public preLinking( action: any ){
    const message = new UiEvent( this, 'pre-linking', action );
    this.on( message );
  }

  //восходящее передача сообщения
  public postLinking( action: any ){
    const message = new UiEvent( this, 'post-linking', action );
    this.on( message );
  }

  //обработка сообщения
  public active( message: UiEvent ){
    try{
      message.handle(this);
    }catch(e){
      console.error('Ошибка при обработки сообщения '+e);
    }finally{
      message.accepted.push( this );
      return;
    }
  }

  //передача сообщения
  public on( message: UiEvent ): void{
    ///console.log( this.constructor.name, message );
    switch( message.event.toLowerCase() ){
      case 'pre-linking':   this.onPreLinking(message);   break;
      case 'post-linking':  this.onPostLinking(message);  break;
      default: throw new Error('controller event type wrong');
    }
  }

  //выполнение операции для каждого дочернего контроллера
  public forEach( action: Function ){
    for(let i=0; i<this.children.length; i++){
      try{
        action( this.children[i] );
      }catch(e){
        throw new Error('action '+((action.name)?action.name:action.toString())+' filed for ' + this.children[i].id);
      }finally{
        continue;
      }
    }
  }

  get children(){
    return this.childNodes;
  }

  get parent(): any{
    return this.parentNode();
  }

  trace( evt? ){
    //console.log( this.constructor.name, evt );
  }


  //нисходящее выполнение сообщения
  public onPreLinking( message: UiEvent ){
    if( message.state == 0 ){
      if( !this.parent ){
        message.state++;
        this.on(message);
      }else{
        //console.log( this.parent );
        this.parent.onPreLinking( message );
      }
    }else if( message.state == 1 ){
      this.active( message );
      this.forEach((pchild: UiCommonComponent)=>{
        pchild.onPreLinking( message );
      });
    }else{
      throw new Error('pre-linking event state wrong');
    }
  }

  //восходящее выполнение сообщения
  public onPostLinking( event: UiEvent ){
    if( event.state == 0 ){
      this.onPreLinking( event );
    }else if( event.state == 1 ){
      this.forEach((pchild: UiCommonComponent)=>{
        pchild.onPostLinking( event );
      });
      this.active( event );
    }else{
      throw new Error('post-linking event state wrong');
    }
  }
  }
