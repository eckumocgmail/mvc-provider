import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthorizationApiController
{

	constructor( private http: HttpClient ){}

	public isSignin(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/AuthorizationApi/IsSignin',pars);
	}

	public signin( Email,Password ){
		let pars = this.toHttpParams({
			Email: Email,
			Password: Password
		} );
		return this.http.get('/AuthorizationApi/Signin',pars);
	}

	public signout(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/AuthorizationApi/Signout',pars);
	}

	public signup( Email,Password,Confirmation,SurName,FirstName,LastName,Birthday,Tel ){
		let pars = this.toHttpParams({
			Email: Email,
			Password: Password,
			Confirmation: Confirmation,
			SurName: SurName,
			FirstName: FirstName,
			LastName: LastName,
			Birthday: Birthday,
			Tel: Tel
		} );
		return this.http.get('/AuthorizationApi/Signup',pars);
	}

	public verify(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/AuthorizationApi/Verify',pars);
	}

	public hasUserWithEmail( Email ){
		let pars = this.toHttpParams({
			Email: Email
		} );
		return this.http.get('/AuthorizationApi/HasUserWithEmail',pars);
	}

	public hasUserWithTel( Tel ){
		let pars = this.toHttpParams({
			Tel: Tel
		} );
		return this.http.get('/AuthorizationApi/HasUserWithTel',pars);
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
