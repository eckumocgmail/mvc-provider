
import { Injectable } from '@angular/core';
//import { AuthStorage } from 'src/app/app-core/core-auth/auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService
{

  //constructor( private storage: AuthStorage ){}
  upload(file){
    var request = new XMLHttpRequest();
    request.open('post', 'https://localhost:44382/api/Upload/AddResource',false);
    //request.setRequestHeader('Authorization',this.storage.getToken());
    request.setRequestHeader("Content-Type","multipart/form-data");
    request.send(file);
  }
}
