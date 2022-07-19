import { TableModel } from './table-model';

export interface EntityFasade {



  count:  (params, resolve, reject)=>any;
  create:  (params, resolve, reject)=>any;

  delete:  (params, resolve, reject)=>any;
  getMetadata:  (params, resolve, reject)=>any;
  join:  (params, resolve, reject)=>any;

  select:  (params, resolve, reject)=>any;
  selectAll:  (params, resolve, reject)=>any;
  selectNotReferencesTo:  (params, resolve, reject)=>any;
  selectPage:  (params, resolve, reject)=>any;
  selectReferencesFrom:  (params, resolve, reject)=>any;
  selectReferencesTo:  (params, resolve, reject)=>any;

  update:  (params, resolve, reject)=>any;
  whereColumnValueIn:  (params, resolve, reject)=>any;

}
