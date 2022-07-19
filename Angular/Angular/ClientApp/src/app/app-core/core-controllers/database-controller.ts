import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DatabaseController
{

	constructor( private http: HttpClient ){}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/Database/Index',pars);
	}

	public isPrimitive( subject ){
		let pars = this.toHttpParams({
			subject: subject
		} );
		return this.http.get('/Database/IsPrimitive',pars);
	}

	public get( entity,operation,args ){
		let pars = this.toHttpParams({
			entity: entity,
			operation: operation,
			args: args
		} );
		return this.http.get('/Database/Get',pars);
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
