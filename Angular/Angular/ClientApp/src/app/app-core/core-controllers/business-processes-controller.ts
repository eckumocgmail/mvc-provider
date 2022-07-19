import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BusinessProcessesController
{

	constructor( private http: HttpClient ){}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/DevFace/BusinessProcesses/Index',pars);
	}

	public details( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessProcesses/Details',pars);
	}

	public create( businessProcess ){
		let pars = this.toHttpParams({
			businessProcess: businessProcess
		} );
		return this.http.get('/DevFace/BusinessProcesses/Create',pars);
	}

	public edit( id,businessProcess ){
		let pars = this.toHttpParams({
			id: id,
			businessProcess: businessProcess
		} );
		return this.http.get('/DevFace/BusinessProcesses/Edit',pars);
	}

	public delete( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessProcesses/Delete',pars);
	}

	public deleteConfirmed( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/BusinessProcesses/DeleteConfirmed',pars);
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
