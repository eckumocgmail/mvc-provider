import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ListItemController
{

	constructor( private http: HttpClient ){}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/ListItem/Index',pars);
	}

	public onClick( hash ){
		let pars = this.toHttpParams({
			hash: hash
		} );
		return this.http.get('/ListItem/onClick',pars);
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
