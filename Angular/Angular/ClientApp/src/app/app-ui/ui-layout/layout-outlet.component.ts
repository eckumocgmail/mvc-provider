import {ComponentRef} from '@angular/core';
import {ViewContainerRef} from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {ComponentFactoryResolver} from '@angular/core';
import {Output} from '@angular/core';
import {Component} from '@angular/core';
import {OnChanges} from '@angular/core';
import {EventEmitter} from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';

/**
 * @example
 * <layout-outlet [componentClass]="ConfirmDialog" (updateComponentRef)="init($event)"></layout-outlet>
 */
@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Component({
    selector: 'layout-outlet',
    template: '<ng-content></ng-content>',
    inputs: [ 'componentClass' ]
})
export class LayoutOutletComponent
implements OnChanges {

    componentClass: any;
    componentRef: ComponentRef<any>;

    @Output('updateComponentRef')
    updateComponentRef = new EventEmitter();


    constructor(    private containerRef:   ViewContainerRef,
                    private resolver:       ComponentFactoryResolver ) {
    }

    ngOnInit() {
        this.update();
    }


    ngOnChanges( changes: SimpleChanges ) {
        if ( changes.componentClass ) {
            this.update();
        }
    }


    update(  ) {
        if ( !this.componentClass ) {
            return;
        } else {
            console.log(this.constructor.name, 'update');
            this.containerRef.clear();
            this.componentRef = this.containerRef.createComponent( this.resolver.resolveComponentFactory( this.componentClass ) );
            this.updateComponentRef.emit( this.componentRef.instance );

        }
    }

}
