import { AbstractModule} from './abstract-module';

export class AbstractDirective {

  annotations:  any;
  name:         string;
  module:       AbstractModule;
  directive:    any;
  dirRef:       any;
  inputs:       any;
  outputs:      any;
}
