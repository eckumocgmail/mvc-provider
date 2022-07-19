import { Injectable } from '@angular/core';

@Injectable()
export class AppControllerService {

  constructor() { }

  get api(){
    const ctrl = this;
    return {
      compile( reportsList ){
        console.log('AppControllerService',reportsList);
        return 0;
      }
    }
  }
}
