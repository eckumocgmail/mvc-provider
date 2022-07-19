import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BusinessDatasourcesController
{

	constructor( private http: HttpClient ){}

	public validateConnectionString( connectionString ){
		let pars = this.toHttpParams({
			connectionString: connectionString
		} );
		return this.http.get('/DevFace/BusinessDatasources/ValidateConnectionString',pars);
	}

	public report(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/DevFace/BusinessDatasources/Report',pars);
	}

	public getDataModel( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessDatasources/GetDataModel',pars);
	}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/DevFace/BusinessDatasources/Index',pars);
	}

	public details( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessDatasources/Details',pars);
	}

	public create( businessDatasource ){
		let pars = this.toHttpParams({
			businessDatasource: businessDatasource
		} );
		return this.http.get('/DevFace/BusinessDatasources/Create',pars);
	}

	public edit( id,businessDatasource ){
		let pars = this.toHttpParams({
			id: id,
			businessDatasource: businessDatasource
		} );
		return this.http.get('/DevFace/BusinessDatasources/Edit',pars);
	}

	public delete( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessDatasources/Delete',pars);
	}

	public deleteConfirmed( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessDatasources/DeleteConfirmed',pars);
	}


	 toHttpParams(obj: any): {[property: string]: string} 
	 { 
	     const result: {[property: string]: string} = { }; 
	     Object.getOwnPropertyNames(obj).forEach(name => { 
	         result[name] = JSON.stringify(obj[name]); 
	     }); 
	     return result; 
	 }           
	}
