import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpUrlEncodingCodec } from "@angular/common/http";


export class EntityRepository<TEntity> {

  $http;
  type:   string;
  create: ()=>TEntity;


  constructor( type: string, $http: HttpClient, create: ()=>TEntity ){
    const ctrl = this;
    this.create = create;
    this.type = type;
    this.$http = function( options: { method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS', url: string } ){
      switch(options.method){
        case 'GET':

          return $http.get(new HttpUrlEncodingCodec().encodeValue(options.url)).pipe(map(ctrl.$ensureSuccessCallback())).toPromise().catch(err=>{console.error(err); alert(err);});
        default:
          throw new Error('Параметры HTTP заданынекорректно');
      }
    };
  }

  $ensureSuccessCallback(){
    const ctrl = this;
    return function( response: any ){
      console.log(response);
      if( response.Status == 'Success' ){
        return response.Result;
      }else{
        throw new Error(response);
      }
    }
  }


  Search(query: string, page: number, size: number): Promise<{
    Page: number,
    PageSize: number,
    TotalResults: number,
    TotalPages: number,
    Results: TEntity[]
  }> {
    console.log('Search', 'query=' + query);
    return this.$http({
      method: 'GET',
      url: `/Database/` + this.type + '/Search?args=' +
        JSON.stringify({
          query: query,
          page: page,
          size: size
        })
    });
  }


  Keywords(query: string): Promise<{
    Query: string, 
    Results: string[]
  }> {
    console.log('Search', 'query=' + query);
    return this.$http({
      method: 'GET',
      url: `/Database/` + this.type + '/Keywords?args=' +
        JSON.stringify({
          query: query 
        })
    });
  }
  

  Find(id: number): Promise<TEntity> {
    console.log('Find',id);
    return this.$http({
      method: 'GET',
      url: `/Database/` + this.type + '/Find?args=' +
        JSON.stringify({
          id: id
        })
    });
  }

  List(): Promise<TEntity[]> {
    console.log('List');
    return this.$http({
      method: 'GET',
      url:    `/Database/` + this.type + '/List'
    });
  }

  Page(page, size): Promise<TEntity[]> {
    console.log('Page');
    return this.$http({
      method: 'GET',
      url: `/Database/` + this.type + '/Page/?args=' +
        JSON.stringify({
          page: page,
          size: size
        })
    });
  }

  Delete(id: number): Promise<number> {
    return this.$http({
      method: 'GET',
      url: `/Database/` + this.type + '/Delete/?args=' +
        JSON.stringify({
          id: id
        })
    });
  }


  GetView() {
    throw new Error("Method not implemented.");
  }

  Update(model: TEntity) {
    console.log('Update',model);
    return this.$http({
      method: 'GET',
      url: `/Database/` + this.type + '/Update?args=' +
        JSON.stringify({
          model: model
        })
    });
  }

  Create(model: TEntity) {
    console.log('Create',model);
    delete model["ID"];
    return this.$http({
      method: 'GET',
      url: `/Database/` + this.type + '/Create/?args=' +
        JSON.stringify({
          model: model
        })
    });

  }

}
