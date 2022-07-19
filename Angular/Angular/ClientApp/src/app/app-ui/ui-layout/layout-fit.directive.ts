import {Directive} from '@angular/core';
import {OnInit} from '@angular/core';
import {ElementRef} from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Directive({
  selector: '[appFit]'
})
export class LayoutFitDirective implements OnInit {

  constructor( private elementRef: ElementRef ) { }

  ngOnInit(): void {
    const ctrl = this;
    this.dom.style.position = 'absolute';
    this.dom.parentElement.addEventListener('resize', () => {
      ctrl.update();
    });
    this.update();
  }

  /**

          <div style="width: 500px;">
<mat-list>
    <h3 matSubheader> folders </h3>

    <mat-list-item style="border: 1px solid black;">



           <mat-icon matListIcon> folder </mat-icon>
           <h4 matLine> root </h4>
           <p matLine class="demo-2"> sdfsdfsdfsdfsdfsdfsdospdgispog </p>

            <div appFit style="border: 1px solid black;"></div>

    </mat-list-item>

</mat-list>

</div>

   */
  update() {
    const rect = this.dom.parentElement.getBoundingClientRect();
    // this.dom.style.top=this.dom.parentElement.offsetTop+'px';
    this.dom.style.left = '0px';
    // this.dom.style.top='0px';
    this.dom.style.width = rect.width + 'px';
    this.dom.style.height = rect.height + 'px';
    // this.dom.style.width=this.dom.parentElement.offsetWidth+'px';
    this.dom.style.height = this.dom.parentElement.offsetHeight + 'px';
  }

  get dom() {
    return this.elementRef.nativeElement;
  }

}
