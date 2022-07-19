import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SettingsController
{

	constructor( private http: HttpClient ){}

	public edit( id,settings ){
		let pars = this.toHttpParams({
			id: id,
			settings: settings
		} );
		return this.http.get('/Settings/Edit',pars);
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
