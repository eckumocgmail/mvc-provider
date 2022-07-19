import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EntitySearch
{

	constructor( private http: HttpClient ){}

	public getKeywords( query ){
		let pars = this.toHttpParams({
			query: query
		} );
		return this.http.get('/EntitySearch`1/GetKeywords',pars);
	}

	public getIndexes(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/EntitySearch`1/GetIndexes',pars);
	}

	public search( query ){
		let pars = this.toHttpParams({
			query: query
		} );
		return this.http.get('/EntitySearch`1/Search',pars);
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
