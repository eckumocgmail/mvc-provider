import { Component, EventEmitter, OnInit } from '@angular/core';
import { specification } from 'src/app/app-ui/ui-common/specification.function';


@specification({
    icon:     'view_headline',
    label:    'layout dialog',
    tooltip:  ''
})
@Component({
  selector: 'ui-iframe',
  template: `

    <layout-dialog>
      <iframe [attr.src]="href" style="width: 100%; height: 100%;"></iframe>
    </layout-dialog>
  `,
  styles: [
  ]
})
export class UiIFrameComponent   {

  href = '/Account/Login';


}
