import { ViewChild, OnChanges, Injector, ElementRef, OnInit } from '@angular/core';
import { Input} from '@angular/core';
import { Component} from '@angular/core';
import { UploadService } from './upload.service';
import { Controlable } from '../../ui-control/control-api/controlable';








@Component({
  selector: 'form-upload',
  templateUrl: './upload-form.component.html'
})
export class UploadFormComponent
extends Controlable
implements OnInit
{

    @ViewChild('file', {static: true}) file: ElementRef;

    @Input()
    formControlName: string;
    files: any[] = [];

    @Input()
    accepts: string = '*.*';

    constructor( private injector: Injector, private service: UploadService ) {
      super(injector);
    }

    ngOnInit(){
      this.enableDrop((files)=>{});
    }

    destroy(evt: Event){
      evt.stopPropagation();
      evt.preventDefault();
    }


    enableDrop(onDrop: (files: any) => void) {
      var dropbox;

      dropbox = this.injector.get(ElementRef).nativeElement;
      dropbox.addEventListener("dragenter", dragenter, false);
      dropbox.addEventListener("dragover", dragover, false);
      dropbox.addEventListener("drop", drop, false);

      function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
      }

      function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
      }

      function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        var files = dt.files;

        console.log(files);
        onDrop( files );
      }
    }


    changed( evt ) {
        this.files = [];
        for ( let i = 0; i < this.file.nativeElement.files.length; i++ ) {
            this.files.push(this.file.nativeElement.files.item(i));
        }
    }

    select() {
        this.file.nativeElement.click();
    }

    upload() {
        const ctrl = this;
        for ( let i = 0; i < this.file.nativeElement.files.length; i++ ) {
            const file = this.file.nativeElement.files.item(i);
            const name = file.name;
            const size = file.size;
            const type = file.type;
            //  const reader = new FileReader();
            // reader.onload = function(){
            //     const data = reader.result;
            //     ctrl.service.upload( file );
            // }
            ctrl.service.upload( file );
            //reader.readAsBinaryString( file );
            // ctrl.app.upload( name, size, type, file );

        }
    }
}
