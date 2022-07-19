import { LayoutLineComponent } from './../ui-layout/layout-line/layout-line.component';
import { ElementRef, Input, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ui-dialog',
  template: `


<!--
    |=======================================================|
    | icon | title                             | window-bar |
    |-------------------------------------------------------|
    | tool-bar                                              |
    |=======================================================|
    |                                                       |
    |                  scrollable content                   |
    |                                                       |
    |                                                       |
    |=======================================================|
    |                                          action-bar   |
    |-------------------------------------------------------|
    | progress-bar |      task-bar            | status-bar  |
    |=======================================================|
 -->


 <div class="app-content-box" style="height: 100%; border-radius: 2px; border: 1px solid var(--primary-color);" [ngClass]="statusModel">
<layout-column class="app-max-size" style="height: 100%;">
    <div class="top app-max-width" style="width: 100%; display: flex; flex-direction: column;">
        <div class="header app-max-width app-front-pane" style="display: flex; flex-direction: row; padding: 8px;">


            <button mat-raised-button>
              <b style="font-size: 36px; padding: 3px;">
                  {{ title }}
              </b>
            </button>
            <ng-content select=".top"></ng-content>

            <div class="window-bar" style="justify-self: flex-end; margin-left: auto; padding: 3px;  " >
                <button mat-icon-button><mat-icon (click)="toggleEditableStatus();"> edit </mat-icon></button>
                <button mat-icon-button><mat-icon (click)="setNonFullScreenMode()"> settings_overscan </mat-icon></button>
                <button mat-icon-button><mat-icon (click)="setFullScreenMode()"> fullscreen </mat-icon></button>
                <button mat-icon-button><mat-icon (click)="close()"> close </mat-icon></button>
            </div>
        </div>
        <div class="app-max-width app-front-pane">

        </div>
        <div class="progress-bar" style="width: 100%;">
            <ng-content select=".subtop"></ng-content>

        </div>
        <div class=" app-max-width" style="width: 100%; background-color: var(--secondary-text-color); color: var(--light-color); border-radius: 2px; border: 1px solid var(--primary-color); display: flex; flex-direction: row;  ">


            <layout-dropdown style="width: 100%;">
              <mat-icon> help </mat-icon>
              <mat-icon> add </mat-icon>
              <mat-icon> remove </mat-icon>
              <mat-icon> edit </mat-icon>
              <mat-icon> view_column </mat-icon>
              <mat-icon> view_headline </mat-icon>
              <mat-icon> people </mat-icon>
              <mat-icon> person_add </mat-icon>
            </layout-dropdown>
        </div>

    </div>
    <layout-line class="app-max-size" style="overflow-y: auto; border-radius: 0px; height: 100%;" #line>
        <div class="left">
          <ng-content select=".left"></ng-content>
        </div>
        <div style="height: 100%;">
          <ng-content #contentOutlet select="*:not(.top):not(.left):not(.right):not(.bottom)"></ng-content>

          <layout-outlet [componentClass]="contentComponentClass" *ngIf="contentComponentClass"></layout-outlet>
        </div>
        <div class="right">
        <ng-content select=".right"></ng-content>
        </div>

    </layout-line>
    <div class="bottom app-max-width" style="display: flex; flex-direction: column; width: 100%;">
        <div class="action-bar app-max-width"  style="display: flex; flex-direction: column; justify-content: flex-end; width: 100%;">

            <!-- <button mat-raised-button
                    class="button dark-primary-color accent-color"
                    style="margin: 10px;">
                    ok
            </button>
            <button  mat-raised-button
                     class="button dark-primary-color accent-color"
                     style="margin: 10px;">
                    cancel
            </button> -->
            <ng-content select=".bottom"></ng-content>

        </div>
        <div class="app-max-width"  style="display: flex; flex-direction: row; width: 100%;">
            <div class="status-bar">
                {{ statusText }}
            </div>
        </div>
    </div>
</layout-column>
</div>`
})
export class UiDialogComponent{

title = 'EcKuMoC';
statusText: string;
statusModel = {
  fullscreen: false,
  editable: false,
};

@ViewChild('line',{static: true})
line: LayoutLineComponent;


@Input()
contentComponentClass: any;

@Input()
contentComponentInstance: any;

@Output() statusChanged = new EventEmitter();

constructor( private elementRef: ElementRef,
             public matIconRegistry: MatIconRegistry,
             public domSanitizer: DomSanitizer ){
  const ctrl = this;
  this.matIconRegistry.addSvgIcon('red-logo',
    ctrl.domSanitizer.bypassSecurityTrustResourceUrl('/assets/red-logo.svg')
  );
}


toggleEditableStatus(){
  console.log('editable');
  this.statusModel.editable = this.statusModel.editable ? false : true;
  this.statusChanged.emit( this.statusModel );
}

ngOnInit() {

}

setNonFullScreenMode(){
  console.log('fullscreen');
  this.statusModel.fullscreen = false;
  this.statusChanged.emit(this.statusModel);
}

setFullScreenMode(){
  console.log('fullscreen');
  this.statusModel.fullscreen = true;
  this.statusChanged.emit(this.statusModel);
}

setEditableMode(){
  console.log('editable');
}

close(){
  console.log('close');
  const dom = this.elementRef.nativeElement;
  dom.parentElement.removeChild( dom );
}

}
