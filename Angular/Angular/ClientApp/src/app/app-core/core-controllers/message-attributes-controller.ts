import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageAttributesController
{

	constructor( private http: HttpClient ){}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/DevFace/MessageAttributes/Index',pars);
	}

	public details( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/MessageAttributes/Details',pars);
	}

	public create( messageAttribute ){
		let pars = this.toHttpParams({
			messageAttribute: messageAttribute
		} );
		return this.http.get('/DevFace/MessageAttributes/Create',pars);
	}

	public edit( id,messageAttribute ){
		let pars = this.toHttpParams({
			id: id,
			messageAttribute: messageAttribute
		} );
		return this.http.get('/DevFace/MessageAttributes/Edit',pars);
	}

	public delete( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/MessageAttributes/Delete',pars);
	}

	public deleteConfirmed( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/MessageAttributes/DeleteConfirmed',pars);
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
