import { AbstractModule } from './core-abstract/abstract-module';
import { AbstractComponent } from './core-abstract/abstract-component';


export interface CoreBuildApi
{
  upgradeModule( moduleClassRef ): AbstractModule;
  upgradeComponent( componentClassRef ): AbstractComponent;
  upgradeDirective( moduleClassRef ): AbstractModule;
  upgradeModule( moduleClassRef ): AbstractModule;
  parseAnnotations( classRef ): AbstractModule;
}
