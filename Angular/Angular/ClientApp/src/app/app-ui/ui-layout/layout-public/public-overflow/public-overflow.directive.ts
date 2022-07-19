import { EventEmitter, Directive, ElementRef, OnInit, Output } from "@angular/core";

import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'selectbox',
    tooltip:  'Selectbox element provider interface to select from drop-down list.'
})
@Directive({
    selector: '[overflowListener],[overflow]'
})
export class PublicOverflowDirective
implements OnInit
{
    @Output() overflowChanged = new EventEmitter();

    updated: number;
    changes: MutationObserver;
    overflowStat:{
        isOverflowX: boolean;
        isOverflowY: boolean;
    }={isOverflowX: false, isOverflowY: false};
    diff: any;



    constructor( private elementRef: ElementRef ){}

    get dom(){ return this.elementRef.nativeElement; }

    ngOnInit(): void {
        const ctrl = this;
        this.dom.style.overflowY='auto';
        this.dom['OverflowListener'] = this;
        this.dom['addEventListener']('resize',function(){
            ctrl.update();
        });
        this.changes = new MutationObserver((mutations: MutationRecord[]) => {
                mutations.forEach((mutation: MutationRecord)=>{ ctrl.update(); });
            }
        );
        this.changes.observe(this.dom, {
            attributes: true,
            childList: true,
            characterData: true
        });
        this.update();
    }

    update(){

        this.updated = new Date().getTime();
        this.diff = this.diffSize( this.scrollSize, this.offsetSize );
        //console.log( this.scrollSize, this.offsetSize, this.diff );
        const newState = {
            isOverflowX: this.diff.w==0? false: true,
            isOverflowY: this.diff.h==0? false: true,
        };

        const hasChanged = !(
            newState.isOverflowX==this.overflowStat.isOverflowX
                &&
            newState.isOverflowY==this.overflowStat.isOverflowY
        );
        if( hasChanged ){
            this.overflowChanged.emit(newState);
        }

        this.overflowStat = newState;

    }



    diffSize( s1: { w: number, h: number },s2: { w: number, h: number } ){
        return{
            w: s2.w-s1.w,
            h: s2.h-s1.h
        }
    }

    get offsetPosition(){
        return{
            x: this.dom.offsetLeft,
            y: this.dom.offsetTop
        };
    }

    get offsetSize(): { w: number, h: number }{
        return{
            w: this.dom.offsetWidth,
            h: this.dom.offsetHeight
        };
    }

    get scrollPosition(){
        return{
            x: this.dom.scrollLeft,
            y: this.dom.scrollTop
        };
    }

    get scrollSize(): { w: number, h: number }{
        return{
            w: this.dom.scrollWidth,
            h: this.dom.scrollHeight
        };
    }
}
