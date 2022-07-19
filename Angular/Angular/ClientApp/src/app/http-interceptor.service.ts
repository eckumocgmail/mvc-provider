import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor
{
  constructor(  ){

  }

  intercept( req: HttpRequest<any>,
             next: HttpHandler): Observable<HttpEvent<any>> {
    const ctrl = this;
    return next.handle(req).pipe(catchError((err)=>{
      if( err.status === 404 ){
        alert(err.status);
      }
      return throwError(err);
    }));
  }

}
