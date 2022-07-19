import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DevController
{

	constructor( private http: HttpClient ){}

	public devHome(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/DevFace/Dev/DevHome',pars);
	}

	public createReport( report ){
		let pars = this.toHttpParams({
			report: report
		} );
		return this.http.get('/DevFace/Dev/CreateReport',pars);
	}

	public updateReport( report ){
		let pars = this.toHttpParams({
			report: report
		} );
		return this.http.get('/DevFace/Dev/UpdateReport',pars);
	}

	public deleteReport( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/Dev/DeleteReport',pars);
	}

	public findReport( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/Dev/FindReport',pars);
	}

	public testConnectinString( str ){
		let pars = this.toHttpParams({
			str: str
		} );
		return this.http.get('/DevFace/Dev/testConnectinString',pars);
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
