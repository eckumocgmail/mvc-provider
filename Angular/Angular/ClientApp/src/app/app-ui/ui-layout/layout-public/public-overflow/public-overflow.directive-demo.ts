import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'public-overflow.directive-demo',
  templateUrl: './public-overflow.directive-demo.html'
})
export class OverflowListenerDirectiveDemoComponent implements OnInit {

  title = 'spb-app-template';

  items = [];
  optinal = [];

  ngOnInit(): void {
    for( let i=0; i<100; i++ )this.items.push(i);
  }

  transform(evt){
    //alert(JSON.stringify(evt));
  }

}
