import { AbstractModule} from './abstract-module';

export class AbstractComponent {

  name:         string;
  module:       AbstractModule;
  annotations:  any[];
  cmpRef:       any;
  template:     string;
  inputs:       any;
  outputs:      any;
  component:    any;

}
