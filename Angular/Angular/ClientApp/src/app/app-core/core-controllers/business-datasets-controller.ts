import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BusinessDatasetsController
{

	constructor( private http: HttpClient ){}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/DevFace/BusinessDatasets/Index',pars);
	}

	public details( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessDatasets/Details',pars);
	}

	public create( businessDataset ){
		let pars = this.toHttpParams({
			businessDataset: businessDataset
		} );
		return this.http.get('/DevFace/BusinessDatasets/Create',pars);
	}

	public edit( id,businessDataset ){
		let pars = this.toHttpParams({
			id: id,
			businessDataset: businessDataset
		} );
		return this.http.get('/DevFace/BusinessDatasets/Edit',pars);
	}

	public delete( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessDatasets/Delete',pars);
	}

	public deleteConfirmed( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessDatasets/DeleteConfirmed',pars);
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
