import {Inject} from '@angular/core';
import {Input} from '@angular/core';
import {Type} from '@angular/core';
import {Component} from '@angular/core';
import {Injectable} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import { InputFormComponent } from '../app-ui/ui-forms/input-form/input-form.component';

@Injectable()
export class UserDialogService
 {

  constructor( private dialog: MatDialog, private sheet: MatBottomSheet  ){

  }

  /**
   * Информационное сообщение
   */

  rightBottom( prototype ){
    const dialogRef = this.dialog.open(
      InputFormComponent,{
        panelClass: 'mat-dialog-panel'
      }
    );
    dialogRef.afterOpen().subscribe((  )=>{
        dialogRef.componentInstance.properties = prototype;

        dialogRef.componentInstance.actions = {
          ok( data ){

            dialogRef.close();
          }
        }
        dialogRef.componentInstance.update();
    });



  }


  bottom( title,prototype,callback ){
    const sheetRef = this.sheet.open( InputFormComponent,{

      panelClass: 'mat-dialog-panel'
    });
    sheetRef.afterOpened().subscribe((  )=>{
      sheetRef.instance.properties = prototype;
      sheetRef.instance.title = title;
      sheetRef.instance.actions = {
        ok( data ){
          try{
            callback( data );
          }catch(e){
            console.error(e);
          }finally{
            sheetRef.dismiss();
          }
        }
      }
      sheetRef.instance.update();
    });
    return sheetRef;
  }


  /**
   *
   * @param title Диалог с формой для ввода данных
   * @param prototype пототип формы
   * @param callback функция запрашивающая данные
   */
  input( title,prototype,callback ){

      const dialogRef = this.dialog.open(
          InputFormComponent,{
            panelClass: 'mat-dialog-panel'
          }
      );
      dialogRef.afterOpen().subscribe((  )=>{
          dialogRef.componentInstance.properties = prototype;
          dialogRef.componentInstance.title = title;
          dialogRef.componentInstance.actions = {
            ok( data ){
              try{
                callback( data );
              }catch(e){
                console.error(e);
              }finally{
                dialogRef.close();
              }
            }
          }
          dialogRef.componentInstance.update();
      });
      return dialogRef;
  }


  /**
   * Информационное сообщение
   */
  info( prototype ){
    const dialogRef = this.dialog.open(
      InputFormComponent,{
        panelClass: 'mat-dialog-panel'
      }
    );
    dialogRef.afterOpen().subscribe((  )=>{
        dialogRef.componentInstance.properties = prototype;

        dialogRef.componentInstance.actions = {
          ok( data ){

            dialogRef.close();
          }
        }
        dialogRef.componentInstance.update();
    });
  }

  popup( component: Type<any>,
         properties: any ){
      const dialogRef = this.dialog.open( component, {
        panelClass: 'mat-dialog-panel',
        height: '500px'
      });
      dialogRef.afterOpen().subscribe((  )=>{
          Object.assign( dialogRef.componentInstance, properties );
      });
      return dialogRef;
  }


  /**
   * Диалоговое сообщение
   * @param component компонент панели диалога
   * @param inputs параметры инициаллизации
   * @param callback обработчик результатов
   *
  popup2( component: Type<any>,
         inputs: any,   //
         callback: ( message: { success: boolean, model: any }  )=>any     ){
    console.log( this );
    const dialogRef = this.dialog.open(
    Pa,{
      data: {
        title:            component.name,
        componentFactory: component,
        componentRef:     inputs,
        completeDialog:   callback
      },
      panelClass: 'mat-dialog-panel'
    });
    const ctrl = this;
    dialogRef.afterClosed().subscribe(( message: { success: boolean, model: any } )=>{
          callback( message );
    });
  }*/

}
