import {Component, ElementRef, ViewChild} from '@angular/core';
import {OnInit} from '@angular/core';

import { Point } from './point';
import { MapService } from './map.service';
import { MapEngineService } from './map-engine.service';
import { MapModelsService } from './map-models.service';
import { MapCtrlService } from './map-ctrl.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent
implements OnInit {

  onRefresh(item: any) {
    this.agents.push( item );
  }

  public minX: number = 100000000000000;
  public maxX: number = 0;
  public minY: number = 100000000000000;
  public maxY: number = 0;
  //public width : number = 1000;
  //public height: number = 1000;
  showControls: boolean = false;
  dataset: any[] = [

  ];

  setSize( size: { width: number, height: number }){
    //this.width  =  size.width;
    //this.height =  size.height;
    console.log( size );
  }

  public points = '142,135.4 125,135.4 125,135.4 125,94.5';


  public refresh(  ){

    const ctrl = this;
    this.points = this.toString();
    ctrl.minX = 10000000000000;
    ctrl.maxX = 0;
    ctrl.minY = 10000000000000;
    ctrl.maxY = 0;
    this.dataset.forEach( data=>{
      ctrl.minX = (ctrl.minX > data.px)? data.px: ctrl.minX;
      ctrl.maxX = (ctrl.maxX < data.px)? data.px: ctrl.maxX;
      ctrl.minY = (ctrl.minY > data.px)? data.py: ctrl.minY;
      ctrl.maxY = (ctrl.maxY < data.px)? data.py: ctrl.maxY;
      this.onRefresh( data );
    });
  }

  trace(a?){
    console.log(this.getParentSize(), this.width, this.height );
    return true;
  }

  toString(){
    let str = '';
    this.dataset.forEach((point: { x: number, y: number })=>{
      str+=' '+point.x+','+point.y
    });
    return str;
  }

  @ViewChild('layout',{static: true}) layout: ElementRef;

  public agents: object[] = [{ x: 1 }];

  constructor( public ctrl: MapService,
               public engine: MapEngineService,
               public models: MapModelsService,
               public controls: MapCtrlService,
               public elementRef: ElementRef ){
    window['app']=this
  }



  start(){

    this.refresh(  );
    //this.models.generate( this );

  }


  getParentNode(){
    return (<HTMLElement>this.elementRef.nativeElement).parentElement;
  }

  getParentSize(){
    const parent = this.layout.nativeElement;
    return{
      width:  parent.offsetWidth,
      height: parent.offsetHeight
    }
  }


  get width(){
    return this.getParentSize().width;
  }
  get height(){
    return this.getParentSize().height;
  }

  toInt( x:number ){
    return x.toFixed(0);
  }

  ngOnInit(): void {
    const ctrl = this;


    this.ctrl.pointsList().subscribe(( dataset: any[] )=>{

      ctrl.minX = 10000000000;
      ctrl.maxX = 0;
      ctrl.minY = 10000000000;
      ctrl.maxY = 0;
      dataset.forEach( data=>{
        ctrl.minX = (ctrl.minX > Number(data.px))? Number(data.px): ctrl.minX;
        ctrl.maxX = (ctrl.maxX < Number(data.px))? Number(data.px): ctrl.maxX;
        ctrl.minY = (ctrl.minY > Number(data.py))? Number(data.py): ctrl.minY;
        ctrl.maxY = (ctrl.maxY < Number(data.py))? Number(data.py): ctrl.maxY;
        ctrl.dataset.push( new Point( data ) );
      });
    });
    this.refresh();

  }







}
