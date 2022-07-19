import { Component } from '@angular/core';
import { NgModuleDef } from '@angular/core/src/r3_symbols';
import { Route } from '@angular/router';
import { AbstractComponent } from './abstract-component';

export class AbstractModule implements Route {

  //routing
  path: string;
  component: any;

  id: any;
  name: string;

  ref: any;
  module: any;
  instance: any;
  declarations: Array<any> = [];
  components: Array<AbstractComponent> = [];
  directives: Array<any> = [];
  pipes: Array<any> = [];
  parent: AbstractModule;
  children: Array<AbstractModule> = [];
  imports: any[] = [];

  constructor( name: string,
               modification: any ) {
      this.name = name;
      this.module = modification;
      this.initCallbackFunction();
  }

  build(){
    this.path = this.name;
    this.component = this.components.length>0 ? this.components[0]: null;
  }


  get label(){
    return this.name;
  }



  getAllComponents(){

  }


  /**
   * инициаллизация функции обратного вызова
   */
  public get: any;
  static [Symbol.toStringTag]() {
      return '[AppModule]';
  }

  /**
   * Обход иерархии
   * @param action действие на каждом узле
   */
  public forEach( action: ( module: AbstractModule ) => any ) {
      action( this );
      this.children.forEach(pchild => { pchild.forEach( action ); });
  }

  /**
   * Поиск конструктора по имени
   * @param name имя конструктора компонента
   */
  find( name: string ) {
      if ( this[name] ) {
          return this[name];
      }
      for ( let i = 0; i < this.children.length; i++ ) {
          if ( this.children[i].name == name ) {
              return this.children[i];
          }
          const result = this.children[i].find( name );
          if ( result ) {
              return result;
          }
      }
      return null;
  }
  /**
   * Линейная одноуровневая маршрутизация, возвращает
   * список маршруты к делегированным компонентам
   * всех модулей в массиве.
  /**
   *
   *
   * @returns
   * @memberof AbstractModule
   */
  public toRoutes() {
      const routes = [];
      const names = [];
      // Компоненты определённые в модуле AppModule не включаются в маршрут
      if ( this.parent ) {
          for ( let i = 0; i < this.declarations.length; i++ ) {
              if ( names.indexOf(this.declarations[i].name) !== - 1 ) {
                  continue;
              } else {
                  names.push( this.declarations[i].name );
                  routes.push({
                      path:       this.declarations[i].name,
                      component:  this.declarations[i],
                      data: {
                          component: this.declarations[i]
                      }
                  });
              }
          }
      }
      for ( let i = 0; i < this.children.length; i++ ) {
          const childRoutes = this.children[i].toRoutes();
          for ( let j = 0; j < childRoutes.length; j++ ) {
              if ( names.indexOf(childRoutes[j].name) !== - 1 ) {
                  continue;
              } else {
                  names.push( childRoutes[j].path );
                  routes.push(childRoutes[j]);
              }
          }
      }
      return routes;
  }

  /**
   * получение всех узлов списком
   */
  list(): Array<AbstractModule> {
      let all: Array<AbstractModule> = [].concat(this.children);
      for ( let i = 0; i < this.children.length; i++ ) {
        all = all.concat(this.children[i].list());
      }
      return all;
  }
  initCallbackFunction() {
      function provide( service ) {
          return function factory() {
              return service;
          };
      }
      this.get = provide( this );
  }
  /**
   * наименование модуля
   */
  public toString() {
      return this.name;
  }
}
