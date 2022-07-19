import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PeopleController
{

	constructor( private http: HttpClient ){}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/People/Index',pars);
	}

	public inGroup( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/People/InGroup',pars);
	}

	public list(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/People/List',pars);
	}

	public details( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/People/Details',pars);
	}

	public create( person ){
		let pars = this.toHttpParams({
			person: person
		} );
		return this.http.get('/People/Create',pars);
	}

	public edit( id,person ){
		let pars = this.toHttpParams({
			id: id,
			person: person
		} );
		return this.http.get('/People/Edit',pars);
	}

	public delete( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/People/Delete',pars);
	}

	public deleteConfirmed( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/People/DeleteConfirmed',pars);
	}

	public getAll( model ){
		let pars = this.toHttpParams({
			model: model
		} );
		return this.http.get('/People/GetAll',pars);
	}

	public getViewName(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/People/GetViewName',pars);
	}

	public getKeywords( query ){
		let pars = this.toHttpParams({
			query: query
		} );
		return this.http.get('/People/GetKeywords',pars);
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
