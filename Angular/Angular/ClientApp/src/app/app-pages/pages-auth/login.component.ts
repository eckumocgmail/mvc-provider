import { Component, OnInit } from '@angular/core';
import { UserAuthorizeService } from './user-authorize.service';
import { specification } from 'src/app/app-ui/ui-forms/input-form/annotations/specification.function';

@specification({
  icon:   'person',
  label:  'авторизация'
})
@Component({
  selector: 'app-login',
  template: `
  <!-- <iframe src="/Account/Login" style="width: 102%; height: 100%; left:-10px; border: none;" focusable="false"></iframe> -->

  <app-frame (keypress)="onKeyPress($event)">
    <div class="frame-header display-4">

      Авторизация
    </div>
    <h2 *ngIf="enabled">Введите пожалуйста учетные данные</h2>
    <h2 *ngIf="!enabled">Подождите пожалуйста</h2>
    <div *ngIf="!enabled">
      <app-progressbar style="width: 100%;"
        [name]="'авторизация'"></app-progressbar>
    </div>
    <div *ngIf="enabled">
      <div class="form-group" align="left">

        <label for="exampleInputEmail1"><b>Электронная почта</b></label>
        <input (input)="username=$event.target.value" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              placeholder="Электронная почта">
        <b id="emailHelp" class="form-text text-muted">
          Необходимо указать адрес указанный при регистрации
        </b>
      </div>
      <div class="form-group" align="left">
        <label for="exampleInputPassword1"><b>Пароль</b></label>
        <input (input)="password=$event.target.value" type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Пароль">
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1" >Запомнить меня</label>
      </div>
      <div class="text-danger" align="center">{{ error }}</div>
      <hr/>
    </div>
    <div align="right">
      <button class="btn btn-primary" (click)="login(username,password)"> вход </button>
    </div>
</app-frame>
<div align=center><a [routerLink]="['/index/register']"> регистрация ученой записи </a></div>

`
})
export class LoginComponent implements OnInit {

  username = 'kba-2018@mail.ru';
  password = 'sgdf1423';

  enabled = true;
  error = '';

  constructor( private authorize: UserAuthorizeService ){

    authorize.signin.validate().subscribe(authorize.callbackValidate());
  }

  onKeyPress(evt){
    if( evt.key=='Enter' ){
      this.login(this.username, this.password);
    }
  }

  login( username, password ){
    const ctrl = this;
    this.enabled = false;

    this.authorize.signin.signin(username,password).subscribe((message:any)=>{
      console.log(message);
      if( message.status !== 'success'){
        ctrl.error = message.message;
        ctrl.authorize.onSigninFailed();
      }else{
        ctrl.error = 'Авторизация выполнена';
        ctrl.authorize.onSigninSuccess();
      }
      setTimeout(()=>{ ctrl.enabled = true; },100);
    });

  }

  ngOnInit() {
  }

}
