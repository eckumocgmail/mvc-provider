import { Output, ViewChild} from '@angular/core';
import { Component} from '@angular/core';
import { OnInit} from '@angular/core';
import { ElementRef} from '@angular/core';
import { EventEmitter} from '@angular/core';
import { MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer} from '@angular/platform-browser';
import { style} from '@angular/animations';
import { MatIcon} from '@angular/material/icon';


@Component({
  selector: 'feature-pane',
  templateUrl: './feature-pane.component.html',
  styleUrls: ['./feature-pane.component.css'],
  inputs: ['title','isRoot']
})
export class FeaturePaneComponent implements OnInit {

  title = 'Frame pane';
  isRoot: boolean = false;
  statusText: string;
  statusModel = {
    fullscreen: false,
    editable: false,
  };

  @Output() statusChanged = new EventEmitter();

  @ViewChild('side',{static: true}) side;

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
