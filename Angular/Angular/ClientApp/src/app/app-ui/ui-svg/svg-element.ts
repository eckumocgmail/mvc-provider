export class SvgElement
{
  static counter: number = 1;

  element: HTMLElement;
  type: 'circle'|'rect'|'polygon'|'pane';

  id = 'svg-element-'+(SvgElement.counter++);

  constructor( type: 'circle'|'rect'|'polygon'|'pane' ){
    this.element = document.createElement( this.type = type );
  }

  setAttribute( key, value ){
    this.element.setAttribute( key, value );
  }


  layout( id: any ){
    const container = document.getElementById(id);
    if(container == null){
      throw new Error('Контейнер '+id+' не найден');
    }else{
      container.appendChild(this.element);
      return 'Элемент '+this.id+' '+this.type+' '+'успешно помещён в контейнер '+id;
    }
  }
}
