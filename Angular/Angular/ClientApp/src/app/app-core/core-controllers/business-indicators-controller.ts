import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BusinessIndicatorsController
{

	constructor( private http: HttpClient ){}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/DevFace/BusinessIndicators/Index',pars);
	}

	public details( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessIndicators/Details',pars);
	}

	public create( businessIndicator ){
		let pars = this.toHttpParams({
			businessIndicator: businessIndicator
		} );
		return this.http.get('/DevFace/BusinessIndicators/Create',pars);
	}

	public edit( id,businessIndicator ){
		let pars = this.toHttpParams({
			id: id,
			businessIndicator: businessIndicator
		} );
		return this.http.get('/DevFace/BusinessIndicators/Edit',pars);
	}

	public delete( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessIndicators/Delete',pars);
	}

	public deleteConfirmed( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessIndicators/DeleteConfirmed',pars);
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
