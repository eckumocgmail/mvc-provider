import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BusinessResourcesController
{

	constructor( private http: HttpClient ){}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/DevFace/BusinessResources/Index',pars);
	}

	public details( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessResources/Details',pars);
	}

	public create( businessResource ){
		let pars = this.toHttpParams({
			businessResource: businessResource
		} );
		return this.http.get('/DevFace/BusinessResources/Create',pars);
	}

	public edit( id,businessResource ){
		let pars = this.toHttpParams({
			id: id,
			businessResource: businessResource
		} );
		return this.http.get('/DevFace/BusinessResources/Edit',pars);
	}

	public delete( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessResources/Delete',pars);
	}

	public deleteConfirmed( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessResources/DeleteConfirmed',pars);
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
