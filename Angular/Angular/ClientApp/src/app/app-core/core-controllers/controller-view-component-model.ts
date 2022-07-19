import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ControllerViewComponentModel
{

	constructor( private http: HttpClient ){}

	public find( hashCode ){
		let pars = this.toHttpParams({
			hashCode: hashCode
		} );
		return this.http.get('/ViewComponentModel`1/Find',pars);
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
