import { Injector} from '@angular/core';
import { Inject} from '@angular/core';
import { Output} from '@angular/core';
import { Component} from '@angular/core';
import { ElementRef} from '@angular/core';
import { EventEmitter} from '@angular/core';
import { of} from 'rxjs';


@Component({
  selector:       'app-pagination',
  templateUrl:    './pagination.component.html',
  inputs: [
      'len', 'page', 'size'
  ]
})
export class PaginationComponent {

      // управляющее сообщение, определяющее необходимость
      // отобразить указанную страницу
      @Output('set-page') setPage = new EventEmitter();

      page = 1;       // номер страницы
      size = 10;      // кол-во элементов на странице
      len: any = 30;        // кол-во элементов всего

      /** конструктор */
      constructor( public injector: Injector  ) {

      }

      /** получение поличества страниц */
      get count() {
          let dev = this.len / this.size;
          dev = ((dev % 1) !== 0) ? Math.floor(dev + 1) : dev;
          return dev;
      }

      /** получение номеров страниц */
      get pages() {
          const ppages = [];
          const n = this.count;

          for ( let i = Math.max(this.page-5,1); i <= Math.min(Math.max(this.page-5,1)+7,this.count); i++ ) {
              ppages.push( i );
          }
          return ppages;
      }

      /** переход на заданную страницу */
      public set( ppage: number ) {
          this.page = ppage;

          /*const dom = this.injector.get(ElementRef).nativeElement;

          const pagesContainer = document.querySelector('.app-pagination-scroll');
          const selectedPageButton = document.querySelectorAll('.app-pagination-scroll .app-pagination-item')[ppage-1];

          console.dir( selectedPageButton.innerHTML );
          console.log( selectedPageButton['offsetLeft'] );
          console.log( pagesContainer['scrollLeft'] );*/



          this.setPage.emit( this.page );
      }
  }
