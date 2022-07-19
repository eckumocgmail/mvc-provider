import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OdbcDatasourceController
{

	constructor( private http: HttpClient ){}

	public getDatasources(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/OdbcDatasource/GetDatasources',pars);
	}

	public getMetadata( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/OdbcDatasource/GetMetadata',pars);
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
