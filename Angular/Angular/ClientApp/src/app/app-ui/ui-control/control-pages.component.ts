import { Component, OnInit, EventEmitter, Injector, Output } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'control-pages,app-pagination',
  inputs:[
      'len','page','size'
  ],
  template: `
    <div class="app-pagination,app-pagination">

    <div style="display: flex; flex-direction: row; flex-wrap: nowrap;">

      <div class="left">
        <button class="app-pagination-item"
                [disabled]="page===1"
                mat-raised-button
                style="width: 100px;"
                (click)="set( page-1 )">
          назад
        </button>
      </div>

      <div style="width: 100%; overflow-x: hidden; white-space: nowrap; overflow-y: hidden;">

          <button *ngFor="let p of pages"
                  mat-raised-button
                  class="app-pagination-item front"
                  [ngClass]="{ 'app-pagination-item-active': p===page }"
                  (click)="set( p )">
              {{ p }}
          </button>
      </div>

      <div class="right">
        <button class="app-pagination-item"
                mat-raised-button
                [disabled]="page===count"
                style="width: 100px;"
                (click)="set( page+1 )">
          вперёд
        </button>
      </div>

    </div>
    </div>


  `,
  styles: [
    `

      .app-pagination{
          width:  100%;
          /* height: 45px; */

          border-radius: 3px;
      }


      button{
          width:              45px;
          /* height:             45px; */
          text-align:         center;
          vertical-align:     middle;
          background-color:   var(--dark-color);
          color:              var(--light-color);
      }

      .app-pagination-item-active{

          font-weight:        1000;
          font-size: larger;
      }
    `
  ]
})

/**
 * Require to be placed at scollable-x container
 *
 * @example
   <app-pagination [length]="items.length" [page]="page" [size]="10"></app-pagination>
 */
// @specification({
//   icon: 'filter_1',
//   label: 'Pagination component',
//   tooltip: 'Pagination component control implements signals for partitioning control functions of provider\'s services.'

// })

export class ControlPagesComponent
{
  //управляющее сообщение, определяющее необходимость
  //отобразить указанную страницу
  @Output('pageChanged') pageChanged = new EventEmitter();

  page: number = 1;       //номер страницы
  size: number = 10;      //кол-во элементов на странице
  len: any = 1;        //кол-во элементов всего

  /** конструктор */
  constructor( public injector: Injector  ){

  }

  /** получение поличества страниц */
  get count(){
      let dev = this.len/this.size;
      dev = ((dev % 1) !== 0) ? Math.floor(dev+1) : dev;
      return dev;
  }

  /** получение номеров страниц */
  get pages(){
      const ppages = [];
      const n = this.count;
      for( let i=1; i<=n; i++ ){
          ppages.push( i );
      }
      return ppages;
  }

  /** переход на заданную страницу */
  public set( ppage: number ){


      /*const dom = this.injector.get(ElementRef).nativeElement;

      const pagesContainer = document.querySelector('.app-pagination-scroll');
      const selectedPageButton = document.querySelectorAll('.app-pagination-scroll .app-pagination-item')[ppage-1];

      console.dir( selectedPageButton.innerHTML );
      console.log( selectedPageButton['offsetLeft'] );
      console.log( pagesContainer['scrollLeft'] );*/



      this.pageChanged.emit( this.page = ppage );
      console.log( this.page );
  }
}
