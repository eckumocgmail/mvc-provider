
import {Inject} from '@angular/core';
import {Input} from '@angular/core';
import {Component} from '@angular/core';
import {Injectable} from '@angular/core';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import {DragDrop} from '@angular/cdk/drag-drop';
import {Portal} from '@angular/cdk/portal';
import {CdkStepper} from '@angular/cdk/stepper';
import {CdkTable} from '@angular/cdk/table';
import {CdkTree} from '@angular/cdk/tree';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {MatBadge} from '@angular/material/badge';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatButton} from '@angular/material/button';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {MatCard} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatStepper} from '@angular/material/stepper';
import {MatDatepicker} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material/dialog';
import {MatDivider} from '@angular/material/divider';
import {MatGridList} from '@angular/material/grid-list';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatList} from '@angular/material/list';
import {MatMenu} from '@angular/material/menu';
import {MatPaginator} from '@angular/material/paginator';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatSelect} from '@angular/material/select';
import {MatSidenav} from '@angular/material/sidenav';
import {MatSlider} from '@angular/material/slider';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {MatToolbar} from '@angular/material/toolbar';
import {MatTooltip} from '@angular/material/tooltip';
import {MatTree} from '@angular/material/tree';
import {Overlay} from '@angular/cdk/overlay';
import {AbstractModule} from 'src/app/app-ui/ui-common/core-abstract/abstract-module';

import {AbstractDirective} from 'src/app/app-ui/ui-common/core-abstract/abstract-directive';
import {AbstractComponent} from 'src/app/app-ui/ui-common/core-abstract/abstract-component';
import {AppCoreService} from 'src/app/app-ui/ui-common/app-core.service';
import {UtilsService} from 'src/app/app-ui/ui-common/utils.service';

/**
 *     , a11y: A11yModule
    , stepper: CdkStepperModule
    , table: CdkTableModule
    , tree: CdkTreeModule
 */
@Injectable({
  providedIn: 'root'
})
export class AppMaterialService
extends AppCoreService
{

  materialModules: any[] = [];

  modules: any[] = [];

  constructor(

                iconModule?: MatIconModule
               , sidenavModule?: MatSidenavModule
               , dragAndDrop?: DragDropModule
               , button?: MatButtonModule
               , card?: MatCardModule
               , input?: MatInputModule
               , radio?: MatRadioModule
               , select?: MatSelectModule
               , dialog?: MatDialogModule
               , autocomplete?: MatAutocompleteModule
               , badge?: MatBadgeModule
               , bottom?: MatBottomSheetModule
               , buttonToggle?: MatButtonToggleModule
               , checkbox?: MatCheckboxModule
               , chips?: MatChipsModule
               , stepper?: MatStepperModule
               , datepicker?: MatDatepickerModule
               , devider?: MatDividerModule
               , expansion?: MatExpansionModule
               , grid?: MatGridListModule
               , icon?: MatIconModule
               , list?: MatListModule
               , menu?: MatMenuModule
               , paginator?: MatPaginatorModule
               , progressbar?: MatProgressBarModule
               , spinner?: MatProgressSpinnerModule
               , sidenav?: MatSidenavModule
               , slider?: MatSliderModule
               , slideToggle?: MatSlideToggleModule
               , snackBar?: MatSnackBarModule
               , sort?: MatSortModule
               , table?: MatTableModule
               , tabs?: MatTabsModule
               , toolbar?: MatToolbarModule
               , tooltip?: MatTooltipModule
               , tree?: MatTreeModule
               , portal?: PortalModule
               , scrolling?: ScrollingModule
               , overlay?: OverlayModule
                ){
    super(arguments);
    try{


      for ( let i = 0; i < arguments.length; i++ ){
        if( !arguments[i] )continue;
        const moduleClass = arguments[i].constructor;
        this.materialModules.push(moduleClass);
        const moduleBase = new AbstractModule( moduleClass.name, '' );
        moduleBase.instance = arguments[i];
        moduleBase.instance.annotations = this.getAnnotationsFromInstance( moduleBase.instance = arguments[i] );
        moduleBase.declarations = moduleBase.instance.annotations[0].declarations;
        moduleBase.declarations.forEach( declaration => {
          const componentBase = new AbstractComponent( );
          componentBase.annotations = this.getAnnotations( declaration );

          componentBase.module = moduleBase;
          if ( declaration.ɵcmp ){
            //console.log(componentBase.annotations[0].template);
            componentBase.cmpRef = declaration.ɵcmp;
            componentBase.name = declaration.name;
            componentBase.component = declaration;
            componentBase.template = declaration.ɵcmp.template;
            componentBase.inputs = declaration.ɵcmp.inputs;
            componentBase.outputs = declaration.ɵcmp.outputs;
            moduleBase.components.push( componentBase );
          }else if ( declaration.ɵdir ){
            const directiveBase = new AbstractDirective();
            directiveBase.dirRef = declaration.ɵdir;
            directiveBase.name = declaration.name;
            directiveBase.directive = declaration;
            directiveBase.inputs = declaration.ɵdir.inputs;
            directiveBase.outputs = declaration.ɵdir.outputs;
            moduleBase.directives.push( directiveBase );

          }else{
            //console.dir( declaration );
          }
        });
        // moduleBase.children =
        // moduleBase.instance.annotations[0].imports;
        this.modules.push( moduleBase );
      }
    }catch(e){
      console.error(e);
    }
  }

  getAnnotationsAtServerPlaform(moduleConstructor){

      let annotations: any[]  = [];
      const decorators: any[] = moduleConstructor.decorators;
      if (!decorators) {
        const annotationsDefinitions = this.getAnnotations(moduleConstructor);;
        new UtilsService().forEach(annotationsDefinitions, (index, value) => {
          annotations.push(value);
        });
        return annotations;
      } else {
        decorators.forEach((decorator) => {
          if ( !decorator.args ){
            throw new Error('can not get decorator.args');
          }else{
            decorator.args.forEach((definitions) => {
              annotations = annotations.concat(definitions);
            });
          }
        });
        return annotations;
      }

  }

  getComponentsInputs( component ){
    //console.dir( component.ɵcmp );
    return{
      name: component.name
    };
  }
  /**
   * Возвращает ссылки на обьекты определенные в аннотациях
   * @param module ссылка на экземпляр модуля
   */
  getAnnotationsFromInstance( module ){
    //console.log('getAnnotationsFromInstance',module);
    return this.getAnnotationsAtServerPlaform( module.constructor );
  }
  getAnnotations( moduleConstructor ){
    let annotations: any[]  = [];
    const decorators: any[] = moduleConstructor.decorators;
    if ( !decorators ){
      annotations.push(moduleConstructor.decorators['emod']);
      //throw new Error('can not get annotations');
    }
    decorators.forEach((decorator) => {
      if ( !decorator.args ){
        throw new Error('can not get decorator.args');
      }else{
        decorator.args.forEach((definitions) => {
          annotations = annotations.concat(definitions);
        });
      }
    });
    return annotations;
  }
  /**
   * Возвращает список всех классов обьявленных в модуле
   * @param module ссылка на экземпляр модуля
   */
  getElements( module ){
    let annotations: any[]  = [];
    const decorators: any[] = module.constructor.decorators;
    if ( !decorators ){
      throw new Error('can not get annotations');
    }
    decorators.forEach((decorator) => {
      if ( !decorator.args ){
        throw new Error('can not get decorator.args');
      }else{
        decorator.args.forEach((definitions) => {
          console.log(definitions);
          Object.getOwnPropertyNames(definitions).forEach((property) => {
            annotations = annotations.concat(definitions[property]);
          });
        });
      }
    });
    return annotations;
  }
}
