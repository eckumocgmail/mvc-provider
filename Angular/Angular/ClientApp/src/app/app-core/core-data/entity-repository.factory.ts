
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EntityRepository } from "./entity-repository";

@Injectable({ providedIn: 'root' })
export class EntityRepositoryFactory {


  constructor() {

  }

  create<TEntity>(name: string, $http: HttpClient, create: ()=>TEntity): EntityRepository<TEntity> {
    return new EntityRepository<TEntity>( name, $http, create );
  }

}
