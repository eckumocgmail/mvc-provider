import { Injectable } from '@angular/core';
import { MapEngineService } from './map-engine.service';
import { MapModelsService } from './map-models.service';

import { MapCtrlService } from './map-ctrl.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor( private http: HttpClient ){
  }

  pointsList(){
    return this.http.get('http://localhost:3000/points');
  }


}
