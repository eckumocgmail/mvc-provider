import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageProtocolsController
{

	constructor( private http: HttpClient ){}

	public editProperty( id,messageProperty ){
		let pars = this.toHttpParams({
			id: id,
			messageProperty: messageProperty
		} );
		return this.http.get('/DevFace/MessageProtocols/EditProperty',pars);
	}

	public viewEditProperty( messageProtocolId,messagePropertyId ){
		let pars = this.toHttpParams({
			messageProtocolId: messageProtocolId,
			messagePropertyId: messagePropertyId
		} );
		return this.http.get('/DevFace/MessageProtocols/ViewEditProperty',pars);
	}

	public addProperty( messageProtocolId,messageAttributeId ){
		let pars = this.toHttpParams({
			messageProtocolId: messageProtocolId,
			messageAttributeId: messageAttributeId
		} );
		return this.http.get('/DevFace/MessageProtocols/AddProperty',pars);
	}

	public removeProperty( messageProtocolId,messagePropertyId ){
		let pars = this.toHttpParams({
			messageProtocolId: messageProtocolId,
			messagePropertyId: messagePropertyId
		} );
		return this.http.get('/DevFace/MessageProtocols/RemoveProperty',pars);
	}

	public viewAddProperty( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/MessageProtocols/ViewAddProperty',pars);
	}

	public index(  ){
		let pars = this.toHttpParams({

		} );
		return this.http.get('/DevFace/MessageProtocols/Index',pars);
	}

	public details( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/MessageProtocols/Details',pars);
	}

	public create( messageProtocol ){
		let pars = this.toHttpParams({
			messageProtocol: messageProtocol
		} );
		return this.http.get('/DevFace/MessageProtocols/Create',pars);
	}

	public edit( id,messageProtocol ){
		let pars = this.toHttpParams({
			id: id,
			messageProtocol: messageProtocol
		} );
		return this.http.get('/DevFace/MessageProtocols/Edit',pars);
	}

	public delete( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/MessageProtocols/Delete',pars);
	}

	public deleteConfirmed( id ){
		let pars = this.toHttpParams({
			id: id
		} );
		return this.http.get('/DevFace/MessageProtocols/DeleteConfirmed',pars);
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
