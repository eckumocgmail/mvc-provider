import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AccountController
{

	constructor( private http: HttpClient ){}

	public loginAsUser(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/Account/LoginAsUser',pars);
	}

	public activationRequire( model ){
		let pars = this.toHttpParams({
			model: model
		} );
		return this.http.get('/Account/ActivationRequire',pars);
	}

	public sendActivationKey(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/Account/SendActivationKey',pars);
	}

	public logout(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/Account/Logout',pars);
	}

	public restore( model ){
		let pars = this.toHttpParams({
			model: model
		} );
		return this.http.get('/Account/Restore',pars);
	}

	public registration( model ){
		let pars = this.toHttpParams({
			model: model
		} );
		return this.http.get('/Account/Registration',pars);
	}

	public activate( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/Account/Activate',pars);
	}

	public registrationComplete(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/Account/RegistrationComplete',pars);
	}

	public getValidationState( property ){
		let pars = this.toHttpParams({
			property: property
		} );
		return this.http.get('/Account/GetValidationState',pars);
	}

	public login( model ){
		let pars = this.toHttpParams({
			model: model
		} );
		return this.http.get('/Account/Login',pars);
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
