import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AboutController
{

	constructor( private http: HttpClient ){}

	public separationOfResponsibilities(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/About/SeparationOfResponsibilities',pars);
	}

	public privacyPolicy(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/About/PrivacyPolicy',pars);
	}

	public contactInformation(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/About/ContactInformation',pars);
	}

	public docs(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/About/Docs',pars);
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
