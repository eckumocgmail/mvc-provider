import { Component, OnInit } from '@angular/core';
import { ModalComponent } from './modal.component';

@Component({
  selector: 'app-modal-confirm',
  template: `
    <div class="modal fade" tabindex="-1" [attr.id]="'modal_'+this.id" role="dialog" >
      <div class="modal-dialog">
        <div class="modal-content">
          <app-frame>

            <h5 class="card-title frame-header">{{ title }}</h5>
             
            <p class="card-text"> {{ text }} </p>
            <div class="frame-footer" align="right">
              <button class="btn btn-primary m-1" (click)="ok()"> ok </button>
              <button class="btn btn-primary m-1" (click)="cancel()"> cancel </button>
            </div>
          </app-frame>
        </div>
      </div>
    </div>

  `
})
export class ModalConfirmComponent extends ModalComponent {

  constructor() {
    super();
  }

}
