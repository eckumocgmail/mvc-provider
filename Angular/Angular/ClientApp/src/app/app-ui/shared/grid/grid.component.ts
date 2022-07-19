import { GridItem } from './grid-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit {

  @Input()
  items: GridItem[]=[{
    src: 'https://image.tmdb.org/t/p/w200/pci1ArYW7oJ2eyTo2NMYEKHHiCP.jpg?api_key=72b56103e43843412a992a8d64bf96e9',
    title: 'string',
    text: 'string',
    annotation: 'string'
  }];

  constructor() { }

  ngOnInit() {
  }

}
