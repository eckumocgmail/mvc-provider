
import { ComponentRef} from '@angular/core';
import { ViewContainerRef} from '@angular/core';
import { SimpleChanges} from '@angular/core';
import { Input} from '@angular/core';
import { Compiler} from '@angular/core';
import { Component} from '@angular/core';
import { NgModule} from '@angular/core';
import { OnInit} from '@angular/core';
import { OnChanges} from '@angular/core';
import { OnDestroy} from '@angular/core';
import { style} from '@angular/animations';




import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { Routes} from '@angular/router';
import { Route} from '@angular/router';
import { Router} from '@angular/router';
import { RouterModule} from '@angular/router';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule} from '@angular/common';
import { BrowserModule} from '@angular/platform-browser';
import { HttpClient} from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';
import { A11yModule} from '@angular/cdk/a11y';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { PortalModule} from '@angular/cdk/portal';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { CdkStepperModule} from '@angular/cdk/stepper';
import { CdkTableModule} from '@angular/cdk/table';
import { CdkTreeModule} from '@angular/cdk/tree';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatBadgeModule} from '@angular/material/badge';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatButtonModule} from '@angular/material/button';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCardModule} from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatChipsModule} from '@angular/material/chips';
import { MatStepperModule} from '@angular/material/stepper';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule} from '@angular/material/dialog';
import { MatDividerModule} from '@angular/material/divider';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatListModule} from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatRadioModule} from '@angular/material/radio';
import { MatSelectModule} from '@angular/material/select';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatSliderModule} from '@angular/material/slider';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import { MatTabsModule} from '@angular/material/tabs';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatTreeModule} from '@angular/material/tree';
import { OverlayModule} from '@angular/cdk/overlay';
import { DragDrop} from '@angular/cdk/drag-drop';
import { Portal} from '@angular/cdk/portal';
import { CdkStepper} from '@angular/cdk/stepper';
import { CdkTable} from '@angular/cdk/table';
import { CdkTree} from '@angular/cdk/tree';
import { MatAutocomplete} from '@angular/material/autocomplete';
import { MatBadge} from '@angular/material/badge';
import { MatBottomSheet} from '@angular/material/bottom-sheet';
import { MatButton} from '@angular/material/button';
import { MatButtonToggle} from '@angular/material/button-toggle';
import { MatCard} from '@angular/material/card';
import { MatCheckbox} from '@angular/material/checkbox';
import { MatStepper} from '@angular/material/stepper';
import { MatDatepicker} from '@angular/material/datepicker';
import { MatDialog} from '@angular/material/dialog';
import { MatDivider} from '@angular/material/divider';
import { MatGridList} from '@angular/material/grid-list';
import { MatIcon} from '@angular/material/icon';
import { MatInput} from '@angular/material/input';
import { MatList} from '@angular/material/list';
import { MatMenu} from '@angular/material/menu';
import { MatPaginator} from '@angular/material/paginator';
import { MatProgressBar} from '@angular/material/progress-bar';
import { MatProgressSpinner} from '@angular/material/progress-spinner';
import { MatSelect} from '@angular/material/select';
import { MatSidenav} from '@angular/material/sidenav';
import { MatSlider} from '@angular/material/slider';
import { MatSlideToggle} from '@angular/material/slide-toggle';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatSort} from '@angular/material/sort';
import { MatTable} from '@angular/material/table';
import { MatToolbar} from '@angular/material/toolbar';
import { MatTooltip} from '@angular/material/tooltip';
import { MatTree} from '@angular/material/tree';
import { Overlay} from '@angular/cdk/overlay';

@Component({
  selector: 'app-jit,jit',
  template: ``,
  styles: [`
  `],
  inputs: ['template']
})
export class CommonJitComponent implements OnInit, OnChanges {
  constructor(  private compiler: Compiler,
               private view: ViewContainerRef ) {}
  public static n = 1;
  public static build: any;                   // ссылка на последний модуль
  public static queue: Array<Function> = [];  // очередь компиляции

  cmpRef: ComponentRef<any>;
  @Input() template: string = 'test';
  ready(){}
  public static run() {                        // запуск компиляции
      while ( CommonJitComponent.queue.length > 0 ) {
        CommonJitComponent.queue.shift()();
      }
  }
  /**
   * при инициаллизации экземпляр компонена регистрирует в сервисе
   */
  ngOnInit(): void {
    console.log(-1);
  }
  /**
   * при уничтожении экземпляр компонена удаляет регистрирацию в сервисе
   */
  ngOnDestroy(): void {
  }
  /**
   * Обновляет компонент через составление шаблона компонента и перекомпиляцию
   * @param evt соыбтие нажатия правой кнопки мыши
   */
  ngOnChanges( changes: SimpleChanges ) {
    let template = this.template;
    const ctrl = this;
    const link = function() {
        /** проверка регистрации  */
        if ( !CommonJitComponent.build ) {
          throw new Error('AppModule not initiallized at JitComponent.build');
        }
        /** создание динамического компонента */
        const cmp = Component({
            template: template
        })(class {
            constructor() {
              this['__proto__'] = ctrl;
              setTimeout(ctrl.ready, 1);
            }
        });
        if( !CommonJitComponent.build ){
          console.warn('!JitComponent.build')
        }
        /** создание динамического модуля с созданным компонентом */
        const module = NgModule({
            imports:        [ CommonJitComponent.build  ].concat([
              A11yModule
            , CdkStepperModule
            , CdkTableModule
            , CdkTreeModule
            , DragDropModule
            , MatButtonModule
            , MatCardModule

            , MatInputModule
            , MatRadioModule
            , MatSelectModule
            , MatDialogModule
            , MatAutocompleteModule
            , MatBadgeModule
            , MatBottomSheetModule
            , MatButtonToggleModule
            , MatCheckboxModule
            , MatChipsModule
            , MatStepperModule
            , MatDatepickerModule
            , MatDividerModule
            , MatExpansionModule
            , MatGridListModule
            , MatIconModule
            , MatListModule
            , MatMenuModule
            , MatPaginatorModule
            , MatProgressBarModule
            , MatProgressSpinnerModule
            , MatSidenavModule
            , MatSliderModule
            , MatSlideToggleModule
            , MatSnackBarModule
            , MatSortModule
            , MatTableModule
            , MatTabsModule
            , MatToolbarModule
            , MatTooltipModule
            , MatTreeModule
            , PortalModule
            , ScrollingModule
            , OverlayModule
            ]),
            declarations:   [ cmp ],
            bootstrap:      [ cmp ]
        })(class {});
        /** компеиляция и создание представления компонента */
        ctrl.compiler.compileModuleAndAllComponentsAsync<any>(module).then((moduleFactory) => {
            const factory = moduleFactory.componentFactories[moduleFactory.componentFactories.length - 1];
            ctrl.view.clear();
            ctrl.cmpRef = ctrl.view.createComponent( factory, ctrl.view.length );
        });
    };


    // если AppModule незарегистрирован то функция регистрируется в очереди выполнения
    if ( !CommonJitComponent.build ) {
        console.log( '!JitComponent.build');
        CommonJitComponent.queue.push(link);
    } else {
        link();
    }
  }
}
