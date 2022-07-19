import {Component} from '@angular/core';
import {style} from '@angular/animations';


@Component({
    selector: 'feature-mark',
    styleUrls: ['./feature-mark.component.css'],
    templateUrl: './feature-mark.component.html'
})
export class FeatureMarkComponent
{
  value = 1;
  selected = true;
}
