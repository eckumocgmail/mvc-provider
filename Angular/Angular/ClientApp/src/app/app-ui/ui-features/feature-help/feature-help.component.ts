import { Injector } from '@angular/core';
import { UiCommonComponent } from 'src/app/app-ui/ui-common/ui-common.component';
import { FeatureHelpService } from './feature-help.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feature-help',
  template: `
    <layout-pane *ngIf="help.title">
      <i class="material-icons">help</i>
      <h5> Справка </h5>
      <h6 *ngIf="help.title"> {{ help.title }} </h6>
      <p *ngIf="help.text">{{ help.text }}</p>
      <div *ngFor="let link of help.links">
        <a [attr.href]="link.href">{{link.label}}</a>
      </div>
    </layout-pane>
  `,
  styles: []
})
export class FeatureHelpComponent
extends UiCommonComponent
implements OnInit {



  constructor( injector: Injector, public help: FeatureHelpService ){
    super(injector);
  }


  ngOnInit() {
  }

}
