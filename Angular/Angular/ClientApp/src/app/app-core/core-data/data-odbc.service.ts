import { TableModel } from 'src/app/app-ui/ui-common/core-database/table-model';
import { OdbcEnntityFasade } from './data-odbc.entity-fasade';
import { EntityFasade } from 'src/app/app-ui/ui-common/core-database/entity-fasade';


import { HttpClient } from '@angular/common/http';

import { Injectable } from "@angular/core";
import { DataModel } from 'src/app/app-ui/ui-common/core-database/data-model';

@Injectable({
  providedIn: 'root'
})
export class DataOdbcService
{

  constructor( private http: HttpClient){
  }

  GetMetadata( connectionString: string ): Promise<DataModel>{
    return this.http.get<DataModel>('/Odbc/GetMetadata',{
      params: {
        connectionString: connectionString
      }
    }).toPromise();
  }

  CreateFasade( tableMetadata: TableModel ): EntityFasade{
    return new OdbcEnntityFasade( this.http, tableMetadata );
  }



}
