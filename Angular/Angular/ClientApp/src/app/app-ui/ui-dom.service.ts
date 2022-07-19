import { Injectable} from '@angular/core';
import { ElementRef} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiDomService {

    public diffSize( s1: { w: number, h: number },s2: { w: number, h: number } ){
        return{
            w: s2.w-s1.w,
            h: s2.h-s1.h
        }
    }

    public isOverflow( dom: HTMLElement )    {
        const diff = this.diffSize( this.getScrollSize(dom), this.getOffsetSize(dom));

        const newState = {
            isOverflowX: diff.w==0? false: true,
            isOverflowY: diff.h==0? false: true,
        };
        return newState.isOverflowX || newState.isOverflowY;
    }

    public isShow( elementRef: ElementRef ){
        /*let rect = this.getOffsetRect(dom)
        let p = dom.parentElement;
        while( p && p !== document.body ){


            if(  this.isOverflow( p )  ){
              const scrollRect = this.getScrollRect(p);
              const offsetRect = this.getOffsetRect(p);
              const clientRect = { x1: scrollRect.x, x2:(scrollRect.x+offsetRect.w), y1:scrollRect.y, y2:(scrollRect.y+offsetRect.h)}
              console.log(p,rect,clientRect);

              if(!(scrollRect.x<=rect.x && rect.x<=scrollRect.x+offsetRect.w && scrollRect.y<=rect.y && rect.y<=scrollRect.y+offsetRect.h)){
                return false;
              }

              //console.log( this.getOffsetRect(p), this.getScrollRect(p)  );
            }else{
              /const op = this.getOffsetPosition( p );
              rect.x += op.x;
              rect.y += op.y;   /
            }
            p = p.parentElement;
        }*/
        console.log( elementRef );
        if( !elementRef ){
            throw new Error('elementRef not defined');
        }else{
            var isInViewport = function (elem) {
                var bounding = elem.getBoundingClientRect();
                return (
                    bounding.top >= 0 &&
                    bounding.left >= 0 &&
                    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            };
            return isInViewport(elementRef);
        }
    }

    public getOffsetPosition(dom: HTMLElement){
        return{
            x: dom.offsetLeft,
            y: dom.offsetTop
        };
    }

    public getOffsetSize(dom: HTMLElement): { w: number, h: number }{
        return{
            w: dom.offsetWidth,
            h: dom.offsetHeight
        };
    }

    public getOffsetRect(dom: HTMLElement): { x: number, y: number,w: number, h: number }{
      return{
          x: dom.offsetLeft,
          y: dom.offsetTop,
          w: dom.offsetWidth,
          h: dom.offsetHeight
      };
  }

    public getScrollPosition(dom: HTMLElement){
        return{
            x: dom.scrollLeft,
            y: dom.scrollTop
        };
    }

    public getScrollSize(dom: HTMLElement): { w: number, h: number }{
        return{
            w: dom.scrollWidth,
            h: dom.scrollHeight
        };
    }

    public getScrollRect(dom: HTMLElement): { x: number, y: number,w: number, h: number }{
      return{
          x: dom.scrollLeft,
          y: dom.scrollTop,
          w: dom.scrollWidth,
          h: dom.scrollHeight
      };
  }


    public getClientSize(dom: HTMLElement): { w: number, h: number }{
      return{
          w: dom.clientWidth,
          h: dom.clientHeight
      };
    }

}
