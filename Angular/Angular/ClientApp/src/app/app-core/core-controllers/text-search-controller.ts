import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TextSearchController
{

	constructor( private http: HttpClient ){}

	public getKeywords( query ){
		let pars = this.toHttpParams({
			query: query
		} );
		return this.http.get('/TextSearch/GetKeywords',pars);
	}

	public search( query ){
		let pars = this.toHttpParams({
			query: query
		} );
		return this.http.get('/TextSearch/Search',pars);
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
