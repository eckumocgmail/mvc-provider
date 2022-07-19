import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feature-lib',
  template: `
    <p>
      feature-lib works!
    </p>
  `,
  styles: [
  ]
})
export class FeatureLibComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
