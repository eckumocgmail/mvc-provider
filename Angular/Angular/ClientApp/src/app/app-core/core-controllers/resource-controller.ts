import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResourceController
{

	constructor( private http: HttpClient ){}

	public list(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/Resource/List',pars);
	}

	public use( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/Resource/Use',pars);
	}

	public create(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/Resource/Create',pars);
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
