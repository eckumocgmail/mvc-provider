import { Injectable, EventEmitter } from '@angular/core';

/**
 * Поисковая служба уровня приложения, обеспечивает связь
 * со строкой поиска.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService
{
  // слова для автоподстановки
  options = [];

  // передаёт события ввода в поисковую строку
  input = new EventEmitter();

  // сообщает о необходимости выполнит поиск
  search = new EventEmitter();


  // получает событие ввода из строки поиска
  onInput(evt){
    this.input.emit(evt);
  }

  // получает сообщение о выполнение поиска
  onSearch(evt){
    this.search.emit(evt);
  }

}
