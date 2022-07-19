import { AppIndexComponent } from './app-index.component';
import { AppStartupService } from './../app-startup.service';
import { AppReportComponent } from './app-report.component';
import { SignInValidatedCanActivateService } from './pages-auth/signin-validated.can-activate.service';
import { LogoutComponent } from './pages-auth/logout.component';
import { RegistrationComponent } from './pages-auth/registration.component';
import { LoginComponent } from './pages-auth/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeveloperComponent } from './pages-developer/developer-database/developer.component';
import { DeveloperFormsComponent } from './pages-developer/developer-forms/developer-forms.component';


const routes: Routes = [

  {
    path: 'index',
    component: AppIndexComponent,
    canActivate: [AppStartupService],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'developer',
        canActivate:[SignInValidatedCanActivateService],
        component: DeveloperComponent
      },
      {
        path: 'developer-forms',
        canActivate:[SignInValidatedCanActivateService],
        component: DeveloperFormsComponent
      },
      {
        path: 'reports/:id',
        canActivate:[SignInValidatedCanActivateService],
        component: AppReportComponent
      },

      {path: 'login', component: LoginComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'register', component: RegistrationComponent },
      {path: '**', redirectTo: '/login', pathMatch: 'full'}
    ]
   },
  {
     path: 'login', redirectTo: '/index/login'
  },
  {
    path: '**', redirectTo: '/index', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPagesRoutingModule { }
