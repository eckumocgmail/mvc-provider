import { Person } from 'src/app/app-core/core-data/data-model/person.model';
import { input } from './../../app-ui/ui-forms/form-input/input-context';
import { OnChanges, SimpleChanges } from "@angular/core";
import { Component } from "@angular/core";
import { UserAuthorizeService } from "./user-authorize.service";
import { specification } from 'src/app/app-ui/ui-forms/input-form/annotations/specification.function';

@specification({
  icon:   'person',
  label:  'регистрация'
})
@Component({
  template: `
    <app-frame>
      <div class="frame-header display-4">
        Регистрация
      </div>
      <div>
        <div class="tab-content" id="v-pills-tabContent">
          <div>
            <div class="card">
            <div class="card-header">
              <ul class="nav nav-pills card-header-pills">
                <ng-content select=".top"></ng-content>
              </ul>
            </div>
            <div class="card-body">
              <div class="card-title"> {{ title }} </div>
              <div *ngIf="view=='account'">
                <h3>Параметры входа</h3>
                  <div class="form-group" align="left">
                    <label for="exampleInputEmail1"><b>Адрес электронной почты</b></label>
                    <input [(ngModel)]="account.email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Адрес электронной почты">
                    <small id="emailHelp" class="form-text text-muted">
                      В дальнейшем для входа в систему необходимо указать этот адрес
                    </small>
                  </div>
                  <div class="form-group" align="left">
                    <label><b>Пароль</b></label>
                    <input [(ngModel)]="account.password" type="password" class="form-control" placeholder="Пароль">
                  </div>
                  <div class="form-group" align="left">
                    <label><b>Подтверждение пароля</b></label>
                    <input [(ngModel)]="account.confirmation" type="password" class="form-control" placeholder="Подтверждение пароля">
                  </div>
                  <hr style="width: 100%;"/>
              </div>
              <div *ngIf="view=='person'">
                <h3>Личные данные</h3>
                <div class="form-group" align="left">
                  <label><b>Имя</b></label>
                  <input [(ngModel)]="person.firstname" type="text" class="form-control" placeholder="Имя">
                </div>
                <div class="form-group" align="left">
                  <label><b>Фамилия</b></label>
                  <input [(ngModel)]="person.surname" type="text" class="form-control" placeholder="Фамилия">
                </div>
                <div class="form-group" align="left">
                  <label><b>Отчество</b></label>
                  <input [(ngModel)]="person.lastname" type="text" class="form-control" placeholder="Отчество">
                </div>
                <div class="form-group" align="left">
                  <label><b>Дата рождения</b></label>
                  <input [(ngModel)]="person.birthday" type="date" class="form-control" placeholder="Дата рождения">
                </div>
                <div class="form-group" align="left">
                  <label><b>Телефон</b></label>
                  <input [(ngModel)]="person.tel" type="tel" class="form-control" placeholder="Телефон">
                </div>
              </div>
            </div>
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1" >
              Я обязуюсь соблюдать правила пользования, изложенные в
            </label>
            <a [routerLink]="['/rules']">"Политика конфиденциальности"</a>
          </div>
          <div class="text-danger" align="center">{{  error }}</div>
          <hr/>
        </div>
      </div>
      <div align="right">
        <button class="btn btn-primary" (click)="signup()"> зарегистрироваться </button>
      </div>
    </div>
    </app-frame>
    <div align=center><a [routerLink]="['/index/login']"> авторизация </a></div>
  `,
  selector: 'registration'
})
export class RegistrationComponent
implements OnChanges
{
  title='Регистрация';
  view='account';

  account = {
    email:        'eckumoc@gmail.com',
    password:     'sgdf1423',
    confirmation: 'sgdf1423'
  }

  person = {
    firstname: 'Константин',
    surname: 'Батов',
    lastname: 'Александрович',
    birthday: '1989-08-26',
    tel: '79043341124'
  }
  error = '';

  constructor(  private authorize: UserAuthorizeService  ){
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  callback(){
    const ctrl = this;
    return function( resp ){
      console.log( resp );
    }
  }

  signup(){
    console.log('signup');
    const ctrl = this;
    if( ctrl.account.password!==ctrl.account.confirmation){

      ctrl.error = 'пароль отличается от подтверждения'
    }else{
      this.authorize.signin.signup(
        ctrl.account.email,
        ctrl.account.password,
        ctrl.account.confirmation,
        ctrl.person.firstname,
        ctrl.person.surname,
        ctrl.person.lastname,
        ctrl.person.birthday,
        ctrl.person.tel
      ).subscribe(ctrl.callback());
    }

  }
}
