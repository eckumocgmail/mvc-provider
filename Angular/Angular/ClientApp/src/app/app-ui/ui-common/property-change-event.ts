//событие изменения свойств
export class PropertyChangeEvent{
  constructor( public prev: any, public current: any, public name: string, public action: string ){ }
}
