import { UiCommonComponent } from './../ui-common/ui-common.component';
import { Component, OnInit, Inject, Injector } from '@angular/core';

@Component({
  selector: 'data-report,report',
  templateUrl: './data-report.component.html',
  styles: []
})
export class DataReportComponent
extends UiCommonComponent
implements OnInit {

  

  constructor(injector: Injector){
    super(injector);
  }

  ngOnInit() {
  }

}
