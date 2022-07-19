import { Component, Input, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { NavBadgedLink } from './nav-badged-link';

@Component({
  selector: 'nav-badged',
  template: `
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center"
          *ngFor="let link of links">
        {{ link.label }}
        <span class="badge badge-primary badge-pill">{{ link.value }}</span>
      </li>
    </ul>
  `,
  styles: []
})
export class NavBadgedComponent
extends NavComponent
implements OnInit {

  @Input()
  links: NavBadgedLink[] = [
    new NavBadgedLink("books","books","/books", 1000),
    new NavBadgedLink("deliveries","register","/register", 500)
  ];

  constructor(){
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
