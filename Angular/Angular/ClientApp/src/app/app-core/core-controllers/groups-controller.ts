import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GroupsController
{

	constructor( private http: HttpClient ){}

	public joinToGroup( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/Groups/JoinToGroup',pars);
	}

	public leaveGroup( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/Groups/LeaveGroup',pars);
	}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/Groups/Index',pars);
	}

	public getAll( model ){
		let pars = this.toHttpParams({
			model: model
		} );
		return this.http.get('/Groups/GetAll',pars);
	}

	public getViewName(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/Groups/GetViewName',pars);
	}

	public getKeywords( query ){
		let pars = this.toHttpParams({
			query: query
		} );
		return this.http.get('/Groups/GetKeywords',pars);
	}

	public details( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/Groups/Details',pars);
	}

	public create( group ){
		let pars = this.toHttpParams({
			group: group
		} );
		return this.http.get('/Groups/Create',pars);
	}

	public edit( group ){
		let pars = this.toHttpParams({
			group: group
		} );
		return this.http.get('/Groups/Edit',pars);
	}

	public delete( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/Groups/Delete',pars);
	}

	public deleteConfirmed( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/Groups/DeleteConfirmed',pars);
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
