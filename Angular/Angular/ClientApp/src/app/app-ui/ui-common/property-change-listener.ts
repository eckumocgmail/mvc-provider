import {UtilsService} from 'src/app/app-ui/ui-common/utils.service';
import { Component, Input, OnChanges, SimpleChanges, Output,EventEmitter, DoCheck, IterableDiffer, IterableDiffers, IterableChangeRecord, SimpleChange, OnInit, AfterViewInit } from "@angular/core";

import { PropertyChangeEvent } from "./property-change-event";

@Component({
  selector:     'app-changes,app-changes',
  templateUrl:  './property-change-listener.html'
})
// tslint:disable-next-line: component-class-suffix
export class PropertyChangeListener
implements OnChanges, DoCheck, OnInit
{


  @Input('property-name')    propertyName: string;       //имя свойства в родительском контейнере
  @Input('property-ref')     propertyRef:  any;          //ссылка на свойство
  @Input('parent-listener')  parentListener: PropertyChangeListener; //ссылка на родительский слушатель

  temp: any;        //предыдущее значение
  self: PropertyChangeListener; //ссылка на себя
  first: boolean = true;  //признак первой проверки

  @Output()   onChanged       = new EventEmitter<any>();  //выполняет передачу события

  //для массивов
  doCheckIterableChanges:   boolean = false;      //выполнять проверку DoCheck, исп. для массивов
  iterableDiffer:           IterableDiffer<any>;  //выполняет сравнение массивов


  constructor (public utils: UtilsService, public deferrers: IterableDiffers ){
    this.self = this;
  }


  //инициаллизация
  ngOnInit(): void{
    this.temp = this.propertyRef;
  }

  //базовый слушатель событий изменения
  ngOnChanges( changes: SimpleChanges ){

    if( changes.propertyRef ){
      this.temp = changes.propertyRef.previousValue;
      if( this.isArray( ) ){
        this.doCheckIterableChanges = true;
        this.iterableDiffer = this.deferrers.find([]).create();
      } else {
        this.doCheckIterableChanges = false;
        this.iterableDiffer = null;
      }
      if( !changes.propertyRef.firstChange ){
        this.onPropertyChanged( changes.propertyRef.previousValue, changes.propertyRef.currentValue, this.propertyName, 'updated' );
      }
    }
  }

  //проверка изменений в массиве
  ngDoCheck() {
    if( this.doCheckIterableChanges ){
      const classChanges = this.iterableDiffer.diff(this.propertyRef);
      if( classChanges && !this.first ){

        classChanges.forEachAddedItem(( record: IterableChangeRecord<any> )=>{
          this.onPropertyChanged( null, record.item, record.currentIndex+'', 'inserted' );
        });

        classChanges.forEachRemovedItem((record: IterableChangeRecord<any>) => {
          this.onPropertyChanged( null, record.item, record.currentIndex+'', 'deleted' );
        });

      }
    }
    this.first = false;
  }

  //передача события изменения
  onPropertyChanged( prev: any, current: any, name: string, action: string ){
    let p: PropertyChangeListener = this;
    let path = name;
    while( p.parentListener ){
      p = p.parentListener;
      path = p.propertyName+'.'+path;
    }

    const event = new PropertyChangeEvent( prev, current, path, action );
    p.onChanged.emit( event );
  }

  //проверка принадлежности свойства к типам данных
  isArray(){
    return this.propertyRef instanceof Array;
  }
  isObject(){
    return !this.isArray() && typeof(this.propertyRef)==='object';
  }
  isFunction(){
    return typeof(this.propertyRef)==='function';
  }

}
