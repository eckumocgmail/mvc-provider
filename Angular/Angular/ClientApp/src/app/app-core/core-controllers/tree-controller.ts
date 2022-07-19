import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TreeController
{

	constructor( private http: HttpClient ){}

	public expand( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/Tree/Expand',pars);
	}

	public select( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/Tree/Select',pars);
	}

	public check( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/Tree/Check',pars);
	}

	public focus( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/Tree/Focus',pars);
	}

	public create( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/Tree/Create',pars);
	}

	public remove( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/Tree/Remove',pars);
	}

	public drop( draggable,droppable ){
		let pars = this.toHttpParams({
			draggable: draggable,
			droppable: droppable
		} );
		return this.http.get('/Tree/Drop',pars);
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
