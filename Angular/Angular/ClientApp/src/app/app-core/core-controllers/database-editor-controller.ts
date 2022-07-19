import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DatabaseEditorController
{

	constructor( private http: HttpClient ){}

	public isPrimitive( subject ){
		let pars = this.toHttpParams({
			subject: subject
		} );
		return this.http.get('/DatabaseEditor/IsPrimitive',pars);
	}

	public get( entity,operation,args ){
		let pars = this.toHttpParams({
			entity: entity,
			operation: operation,
			args: args
		} );
		return this.http.get('/DatabaseEditor/Get',pars);
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
