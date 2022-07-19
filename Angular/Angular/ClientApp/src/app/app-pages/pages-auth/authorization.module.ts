import { HttpInterceptorService } from './../../http-interceptor.service';
import { SignInValidatedCanActivateService } from './signin-validated.can-activate.service';
import { UserAuthorizeService } from './user-authorize.service';
import { UserSigninService } from './user-signin.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout.component';
import { LoginComponent } from './login.component';
import { RegistrationComponent } from './registration.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { AppUiModule } from 'src/app/app-ui/app-ui.module';
import { SharedModule } from 'src/app/app-ui/shared/shared.module';

/**
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login',      component: LoginComponent },
      { path: 'register',   component: RegistrationComponent },

 */
@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    LogoutComponent
  ],
  imports: [
    AppUiModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot([

    ])
  ],
  providers: [
    UserSigninService,
    SignInValidatedCanActivateService,

    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ]
})
export class AuthorizationModule { }
