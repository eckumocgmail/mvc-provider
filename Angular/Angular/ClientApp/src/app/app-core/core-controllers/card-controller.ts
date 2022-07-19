import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CardController
{

	constructor( private http: HttpClient ){}

	public setActive( hash,property ){
		let pars = this.toHttpParams({
			hash: hash,
			property: property
		} );
		return this.http.get('/Card/SetActive',pars);
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
