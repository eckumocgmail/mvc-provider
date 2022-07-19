import { Component, OnInit } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-forms/input-form/annotations/specification.function';

@specification({
  icon:   'home',
  label:  'Формы'
})
@Component({
  selector: 'app-developer-forms',
  templateUrl: './developer-forms.component.html',
  styleUrls: ['./developer-forms.component.css']
})
export class DeveloperFormsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
