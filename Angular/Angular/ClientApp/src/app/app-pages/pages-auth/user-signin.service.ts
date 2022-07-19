import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { pipe,Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserSigninService{

  constructor( private http: HttpClient ){}

  signin( email, password ){
    console.log('/api/AuthorizationApi/Signin');
    return this.http.get('/api/AuthorizationApi/Signin',{
      params:{
        Email: email,
        Password: password
      }
    });
  }

  signout(    ){
    return this.http.get('/api/AuthorizationApi/Signout',{
      params:{
      }
    });
  }

  signup( email, password, confirmation,firstname, surname, lastname, birthday, tel  ){
    console.log('UserSigninService.signup',email);

    return this.http.get('/api/AuthorizationApi/Signup',{
      params:{
        Email:        email,
        Password:     password,
        Confirmation: confirmation,
        SurName:      surname,
        FirstName:    firstname,
        LastName:     lastname,
        Birthday:     birthday,
        Tel:          tel
      }
    });
  }

  validate(): Observable<boolean>{
    return this.http.get('/api/AuthorizationApi/IsSignin').pipe(map((resp:any)=>{
      console.log(resp);
      return resp.isSignin;
    }));
  }
}
