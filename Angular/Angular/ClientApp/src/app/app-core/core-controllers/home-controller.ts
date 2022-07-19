import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HomeController
{

	constructor( private http: HttpClient ){}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/Home/Index',pars);
	}

	public privacy(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/Home/Privacy',pars);
	}

	public throw(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/Home/Throw',pars);
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
