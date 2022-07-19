import { Component, OnInit } from '@angular/core';
import { UserAuthorizeService } from './user-authorize.service';
import { specification } from 'src/app/app-ui/ui-forms/input-form/annotations/specification.function';

@specification({
  icon:   'person',
  label:  'выход'
})

@Component({
  selector: 'app-logout',
  template: `
    please wait
`
})
export class LogoutComponent implements OnInit {

  constructor( private authorize: UserAuthorizeService ){ }

  ngOnInit() {
    const ctrl = this;
    this.authorize.signin.signout().subscribe((resp)=>{
      ctrl.authorize.onSignoutSuccess();
    });
  }

}
