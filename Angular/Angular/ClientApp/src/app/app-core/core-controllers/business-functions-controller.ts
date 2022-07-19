import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BusinessFunctionsController
{

	constructor( private http: HttpClient ){}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/DevFace/BusinessFunctions/Index',pars);
	}

	public details( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessFunctions/Details',pars);
	}

	public create( businessFunction ){
		let pars = this.toHttpParams({
			businessFunction: businessFunction
		} );
		return this.http.get('/DevFace/BusinessFunctions/Create',pars);
	}

	public edit( id,businessFunction ){
		let pars = this.toHttpParams({
			id: id,
			businessFunction: businessFunction
		} );
		return this.http.get('/DevFace/BusinessFunctions/Edit',pars);
	}

	public delete( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessFunctions/Delete',pars);
	}

	public deleteConfirmed( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessFunctions/DeleteConfirmed',pars);
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
