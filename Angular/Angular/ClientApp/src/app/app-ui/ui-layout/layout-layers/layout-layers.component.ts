import { Component, SimpleChanges, ElementRef, ViewChild, Injector } from '@angular/core';
import { UiCommonComponent } from '../../ui-common/ui-common.component';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


/**
 * @example
    <div style="width: 55px; height: 55px; border: 1px solid black;">
      <layout-layers current="layers.current" #layers>
          <button style="background-color: red;">1</button>
          <button style="background-color: blue;">2</button>
          <button style="background-color: red;">3</button>
          <button style="background-color: blue;">4</button>
          <button style="background-color: red;">5</button>
          <button style="background-color: blue;">6</button>
      </layout-layers>
    </div>

    This is a layered pane
    <div style="float: right;">
        layer: {{ layers.current }} / {{ layers.layers.length }}
        <button (click)="(layers.current=layers.current-1)>0 ? layers.update(): false"> - </button>
        <button (click)="(layers.current=layers.current+1)>0 ? layers.update(): false"> + </button>
    </div>
 */
@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'layout-layers',
  template: `
    <button style="width: 100%; height: 100%;">
      <ng-content></ng-content>
    </button>`
})
export class LayoutLayersComponent
extends UiCommonComponent{

  //слой с индексом current находится на верхнем уровне
  current: number = 0;
  layers:  Array<HTMLElement> = [];

  constructor( injector: Injector, private container: ElementRef ){
    super(injector);
  }

  ngOnInit(){
      const ctrl = this;

      const observer = new MutationObserver((mutations) => {
          mutations.forEach(
              (mutation) =>{
                  console.log(mutation);
                  if( mutation.type == "childList"  ){
                      ctrl.update();
                  }
          });

      });
      observer.observe( this.container.nativeElement, {
          attributes: true,
          childList: true,
          characterData: true
      });
      console.log(this.container.nativeElement);
      ctrl.update();
  }


  ngOnChanges( changes: SimpleChanges ): void {
      console.log('changed');
      this.update();
  }


  update(){
      const container = this.container.nativeElement.children[0];
      container.children[this.current].style.zIndex=100;

      this.layers = container.children;
      for( let i=0; i<container.children.length; i++ ){

        Object.assign( container.children[ i ].style, {
          position: 'absolute',
          width:     container.offsetWidth+'px',
          height:    container.offsetHeight+'px',
          left:      container.offsetLeft+'px',
          top:       container.offsetTop+'px',

        });
        if( i==this.current ){
            container.children[this.current].style.zIndex=100;
        }else{
            container.children[ i ].style.zIndex=0;
        }
      }

  }
}
