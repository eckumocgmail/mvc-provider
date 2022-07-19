import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserController
{

	constructor( private http: HttpClient ){}

	public saveModel( type,properties ){
		let pars = this.toHttpParams({
			type: type,
			properties: properties
		} );
		return this.http.get('/User/SaveModel',pars);
	}

	public userHome( user ){
		let pars = this.toHttpParams({
			user: user
		} );
		return this.http.get('/User/UserHome',pars);
	}

	public messages(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/User/Messages',pars);
	}

	public settings( model ){
		let pars = this.toHttpParams({
			model: model
		} );
		return this.http.get('/User/Settings',pars);
	}

	public navigateTo( key ){
		let pars = this.toHttpParams({
			key: key
		} );
		return this.http.get('/User/NavigateTo',pars);
	}

	public waitForCardReader(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/User/WaitForCardReader',pars);
	}

	public cardReaded(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/User/CardReaded',pars);
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
