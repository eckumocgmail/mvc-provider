import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CollectionListComponent } from '../ui-collection/collection-list/collection-list.component';
import { UiDialogComponent } from './ui-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class UiDialogService{

  constructor( private dialog: MatDialog,
               private snackbar: MatSnackBar ) { }


  /**
   * Вывод информационного сообщения в диалоговое окно
   * @param message текст сообщения
   * @param action надпись на кнопки закрытия окна
   */
  info( message: string, action: string ){
    const snack = this.snackbar.open( message, action );
  }
  popup( title: string, message: string, arg2: any) {
    throw new Error('Method not implemented.');
  }


  /**
   *
   * @param selectionList
   */
  select( title: string,
          message: string,
          selectionList: Observable<any[]>|any[],
          callback: (selected)=>{} ): void{
    const dialogRef = this.dialog.open( UiDialogComponent, {
      panelClass: 'mat-dialog-panel',
      height:     '360px'
    });
    if( selectionList instanceof Observable ){
      dialogRef.afterOpened().subscribe(()=>{
        selectionList.subscribe((items)=>{
          dialogRef.componentInstance.contentComponentClass = CollectionListComponent;
          dialogRef.componentInstance.contentComponentInstance.listitems = items;
        });
      })
    }else{
      dialogRef.afterOpened().subscribe(()=>{
          dialogRef.componentInstance.contentComponentClass = CollectionListComponent;
          dialogRef.componentInstance.contentComponentInstance.listitems = selectionList;
      })

    }
  }


  /**
   * Диалоговое окно подтверждения выполнения действия
   * @param title заголовок диалогового окна
   * @param message сообщение пользователю
   * @param actions функции обработки событий
   */
  confirm( title: string,
           message: string,
           actions: {
             ok?: Function,
             cancel?: Function }) {
    const dialogRef = this.dialog.open( DialogConfirmComponent, {
      panelClass: 'mat-dialog-panel',
      height:     '360px'
    });
    dialogRef.afterOpened().subscribe((  ) => {
        Object.assign( dialogRef.componentInstance, {
          title,
          message,
          actions( message: string ){
            try{
              switch ( message ){
                case 'ok': {
                  if ( actions.ok ) { actions.ok(); }
                  break;
                }
                case 'cancel':
                  if ( actions.cancel ) { actions.cancel(); }
                  break;
                default:
                  throw new Error('Unsupported event message arrived from confirmation dialog: ' + message + '.');
              }
            }catch ( e ){
              console.error(e);
            }finally{
              dialogRef.close();
            }
          }
        } );
    });
    return dialogRef;
  }

}
