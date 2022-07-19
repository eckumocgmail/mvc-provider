import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  title = 'Title';
  subtitle = 'Subtitle';
  text = 'Text';
  path = '';
  link = 'checkout';

  constructor() { }

  ngOnInit() {
  }

}
