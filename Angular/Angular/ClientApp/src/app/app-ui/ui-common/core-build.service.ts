import { ReflectionService } from './app-reflection.service';
import { Injectable, Injector } from '@angular/core';
import { AppCoreService } from './app-core.service';
import { AbstractModule } from './core-abstract/abstract-module';
import { AppMaterialService } from './app-material.service';
import { AbstractComponent } from './core-abstract/abstract-component';
import { AbstractDirective } from './core-abstract/abstract-directive';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoreBuildApi } from './core-build.api';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CoreBuildService
extends AppCoreService
implements CoreBuildApi
{
  static filteredModules: any[] = [
        'A11yModule',
        'CommonModule',
        'RouterModule',
        'BrowserModule',
        'FormsModule',
        'ReactiveFormsModule',
        'HttpClientModule',
        'BrowserAnimationsModule',
        'NoopAnimationsModule'
  ];

  root:     AbstractModule;
  modules:  AbstractModule[]=[];

  constructor(
    private utils: UtilsService,
    private appMaterialService: AppMaterialService,
    private reflectionService: ReflectionService,
    private injector: Injector  ){//},  private broserService: AppBrowserService ){
    super( arguments );
  }


  public getAllComponents(){
    const components = [];
    if(this.root){
      this.root.forEach((pmodule)=>{
        pmodule.components.forEach((pcomponent)=>{
          if(components.indexOf(pcomponent)==-1){
            components.push(pcomponent);
          }
        });
      });
    }
    return components;
  }

  upgradeComponent(componentClassRef: any): AbstractComponent {
    throw new Error("Method not implemented.");
  }

  upgradeModule(moduleClassRef: any): AbstractModule{
    throw new Error("Method not implemented.");
  }


  upgradeDirective(moduleClassRef: any): AbstractModule {
    throw new Error("Method not implemented.");
  }
  parseAnnotations(classRef: any): AbstractModule {
    throw new Error("Method not implemented.");
  }


  build( modules ): any{
    console.log('build');
    try{
      this.modules = this.buildBrowserModule( modules );
      this.root = this.modules[0];
    }catch(e){
      console.error(e);
    }

    return this.root;
  }

  /**
   * Возвращает ссылки на обьекты определенные в аннотациях
   * @param module ссылка на экземпляр модуля
   */
  getAnnotationsFromInstance( module ){

    return this.getAnnotations( module.constructor );
  }

  getAnnotations( moduleConstructor ){
    let annotations: any[]  = [];
    const decorators: any[] = moduleConstructor.decorators;
    if (!decorators) {
      const annotationsDefinitions = this.reflectionService.getAnnotations(moduleConstructor);;
      this.utils.forEach(annotationsDefinitions, (index, value) => {
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



  /**
   *
   * @param modules
   */
  buildBrowserModule(modules): AbstractModule[]{
    const ctrl = this;
    const output: AbstractModule[] = [];
    for ( let i = 0; i < modules.length; i++ ){
      console.log( modules[i].name );
      const moduleClass = modules[i];

      const moduleBase = new AbstractModule( moduleClass.name, '' );
      moduleBase.instance = modules[i];
      moduleBase.ref = this.injector.get(moduleClass);
      //moduleBase.instance.annotations = this.material.getAnnotationsFromInstance( moduleBase.instance = modules[i] );
      moduleBase.instance.annotations = this.getAnnotations( moduleBase.instance = modules[i] );
      //console.log(moduleClass, moduleBase.instance.annotations);
      moduleBase.declarations = moduleBase.instance.annotations[0].declarations;
      moduleBase.imports = moduleBase.instance.annotations[0].imports;
      if( moduleBase.imports ){
        moduleBase.imports.forEach( child => {
          // исключает базовые модули
          if ( CoreBuildService.filteredModules.indexOf( child.name ) == -1
            && ctrl.appMaterialService.materialModules.indexOf(child)===-1
            ) {
              if ( child.name !== 'RouterModule' && typeof(child) === 'function'
                    && !(child.name.startsWith('Mat') || child.name.startsWith('Cdk'))
                  ) {
                moduleBase.children = moduleBase.children.concat(ctrl.buildBrowserModule( [child] ));
              }
          }

        });
      }
      if( moduleBase.declarations ){


        moduleBase.declarations.forEach( declaration => {

          const annotations = this.getAnnotations( declaration );

          if ( declaration.ɵcmp ){
            const componentBase = new AbstractComponent( );
            componentBase.module = moduleBase;
            componentBase.annotations = annotations;

            componentBase.cmpRef = declaration.ɵcmp;
            componentBase.name = declaration.name;
            componentBase.component = declaration;
            componentBase.template = componentBase.annotations[0].template;
            componentBase.inputs = declaration.ɵcmp.inputs;
            componentBase.outputs = declaration.ɵcmp.outputs;
            declaration['get'] = function(){ return componentBase; }
            moduleBase.components.push( componentBase );
          }else if ( declaration.ɵdir ){
            const directiveBase = new AbstractDirective();
            directiveBase.module = moduleBase;
            directiveBase.annotations = annotations;
            directiveBase.dirRef = declaration.ɵdir;
            directiveBase.name = declaration.name;
            directiveBase.directive = declaration;
            directiveBase.inputs = declaration.ɵdir.inputs;
            directiveBase.outputs = declaration.ɵdir.outputs;
            moduleBase.directives.push( directiveBase );

          } else {

            this.onDeclarations
            //console.dir( declaration );
          }
        });
      }
      //moduleBase.children =
      //moduleBase.instance.annotations[0].imports;
      output.push( moduleBase );
      moduleBase.build();
    }

    console.log('builded',output);
    return output;
  }

  private onDeclarations(definition: any, composition: AbstractModule, subject: any) {

    definition.name = name;
    for (let k = 0; k < definition.length; k++) {
      composition[definition[k].name] = definition[k];
      composition.declarations.push(definition[k]);
      const declarationAnnotations = definition[k]['__annotations__'];
      if (declarationAnnotations && declarationAnnotations.length == 1) {
        const declarationAnnotation = declarationAnnotations[0];
        // if (declarationAnnotation.selector) {
        //   if (declarationAnnotation.template || declarationAnnotation.templateUrl) {
        //     this.upgradeComponent(subject, definition[k], declarationAnnotation);
        //     composition.components.push(definition[k]);
        //     if (subject.upgradeComponent) {
        //       subject.upgradeComponent(subject, definition[k], declarationAnnotation);
        //     }
        //   }
        //   else {
        //     this.upgradeDirective(subject, definition[k], declarationAnnotation);
        //     composition.directives.push();
        //     if (subject.upgradeDirective) {
        //       subject.upgradeDirective(subject, definition[k], declarationAnnotation);
        //     }
        //   }
        // }
        // else {
        //   this.upgradePipe(subject, definition[k], declarationAnnotation);
        //   composition.pipes.push(definition[k]);
        //   if (subject.upgradePipe) {
        //     subject.upgradePipe(subject, definition[k], declarationAnnotation);
        //   }
        // }
      }
      else {
        throw new Error('decalration has not annotations or annotationds length > 0');
      }
    }
  }



}
