import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ViewController
{

	constructor( private http: HttpClient ){}

	public execute( container,procedure ){
		let pars = this.toHttpParams({
			container: container,
			procedure: procedure
		} );
		return this.http.get('/View/Execute',pars);
	}

	public todo( code ){
		let pars = this.toHttpParams({
			code: code
		} );
		return this.http.get('/View/Todo',pars);
	}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/View/Index',pars);
	}

	public update( modelId ){
		let pars = this.toHttpParams({
			modelId: modelId
		} );
		return this.http.get('/View/Update',pars);
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
