import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { FrameModule } from '../frame/frame.module';
import { ModalConfirmComponent } from './modal-confirm.component';

@NgModule({
  declarations: [ModalConfirmComponent, ModalComponent],
  exports: [
    ModalConfirmComponent,
    ModalComponent,
    FrameModule
  ],
  bootstrap: [ModalConfirmComponent,ModalComponent],
  imports: [
    CommonModule,
    FrameModule
  ]
})
export class ModalModule { }
