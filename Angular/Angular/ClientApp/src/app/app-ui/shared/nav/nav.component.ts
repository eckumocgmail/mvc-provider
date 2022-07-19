import { Component, Input, OnInit } from '@angular/core';
import { NavLink } from './nav-link';




/**

    <ul class="nav nav-pills flex-column">
      <li class="nav-item">
        <a class="nav-link active" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>

 * @export
 * @class NavComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {


  @Input()
  vertical = false;

  @Input()
  links: NavLink[] = [
    new NavLink("Авторизация","login","/login"),
    new NavLink("Регистрация","register","/register")
  ];

  constructor() { }

  ngOnInit() {
  }



}

