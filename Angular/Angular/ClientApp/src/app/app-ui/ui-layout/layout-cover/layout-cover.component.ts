import { Component, OnInit, ElementRef, SimpleChanges, Injector } from '@angular/core';
import { UiCommonComponent } from '../../ui-common/ui-common.component';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
  selector: 'layout-cover',
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
  ]
})
export class LayoutCoverComponent
extends UiCommonComponent
implements OnInit {

  constructor( injector: Injector, private container: ElementRef ){
    super( injector );
  }

  ngOnInit(){
    super.ngOnInit();
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
    ctrl.update();
  }

  ngOnChanges( changes: SimpleChanges ): void {
    super.ngOnChanges( changes );
    this.update();
  }

  update(){
    Object.assign(this.container.nativeElement.children[0].style,{
      width:     '100%',
      height:    '100%',
    })
    const container = this.container.nativeElement.children[0];
    if( container.children.length > 1){
      throw new Error('Too much content into layout cover component.');
    }
    for( let i=0; i<container.children.length; i++ ){
      Object.assign( container.children[ i ].style, {
        position: 'absolute',
        width:     container.offsetWidth+'px',
        height:    container.offsetHeight+'px',
        left:      container.offsetLeft+'px',
        top:       container.offsetTop+'px',
      });
    }
    }

  }
