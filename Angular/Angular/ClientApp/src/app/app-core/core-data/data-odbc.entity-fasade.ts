
import { HttpClient } from '@angular/common/http';
import { EntityFasade } from "src/app/app-ui/ui-common/core-database/entity-fasade";
import { TableModel } from "src/app/app-ui/ui-common/core-database/table-model";

export class OdbcEnntityFasade
implements EntityFasade
{


  constructor( http: HttpClient, metadata: TableModel ){

  }

  count(params: any, resolve: any, reject: any){

  }
  create(params: any, resolve: any, reject: any){

  }
  delete(params: any, resolve: any, reject: any){

  }
  getMetadata(params: any, resolve: any, reject: any){

  }
  join(params: any, resolve: any, reject: any){

  }
  select(params: any, resolve: any, reject: any){

  }
  selectAll(params: any, resolve: any, reject: any){

  }
  selectNotReferencesTo(params: any, resolve: any, reject: any){

  }
  selectPage(params: any, resolve: any, reject: any){

  }
  selectReferencesFrom(params: any, resolve: any, reject: any){

  }
  selectReferencesTo(params: any, resolve: any, reject: any){

  }
  update(params: any, resolve: any, reject: any){

  }
  whereColumnValueIn(params: any, resolve: any, reject: any){

  }

}
