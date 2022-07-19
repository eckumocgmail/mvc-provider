import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapModelsService {

  public names: string[] = ['generate'];

  constructor(){
    const ctrl = this;
  }

  createPoint( model: any ): { x: number; y: number; } {
    return {
      x: parseInt((Math.random( )*model.width).toFixed(0)),
      y: parseInt((Math.random( )*model.height).toFixed(0))
    }
  }



  generate( ctrl: any ) {
    const self = this;
    var processId: any = setInterval(() => {
      ctrl.push( self.createPoint(ctrl) );
      ctrl.refresh(  );
    }, 100);
    setTimeout(() => { window.clearInterval(processId); }, 10000);
  }

}
