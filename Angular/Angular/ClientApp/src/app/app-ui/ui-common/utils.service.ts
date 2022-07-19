import { Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UtilsService
{

  /**
   * удаление дубликатов
   * @param array массив обьектов
   */
  public removeDublicatedValues( array ){
      const set = new Set( array );
      let items = [];
      set.forEach(
          (p)=>{
              items.push(p);
          }
      )
      return items;
  }

  /**
   * Преобразует идентификатор к стилу css
   * @param capitalized идентификатор заглавными буквами
   */
  public toCssStyle(capitalized: string){
      const arr = this.splitCapitalizaId(capitalized);
      //console.log(capitalized,arr);
      const styleId = this.concatBySeparator(arr.splice(0,arr.length-1));
      return styleId;
  }

  /**
   * Выплняет разбор имени (CapitalizeStyle)
   * @param id идентификатор
   */
  public splitCapitalizaId(id: string){
      let message = '';
      const upper = id.toUpperCase();
      for( let i=0; i<id.length; i++ ){
          if( i!=0 && id.charCodeAt(i)===upper.charCodeAt(i) ){
              message += ' ';
          }
          message += id[i].toLowerCase();
      }
      const arr = message.split(' ');
      return arr;
  }
  public splitCapitalizaIdStr(id: string){
      let str='';
      this.splitCapitalizaId(id).forEach(id=>{
          str += id + ' ';
      });
      return str.trim();
  }

  /**
   * Склеивает массив строк через разделитель
   * @param ids массив строк
   */
  public concatBySeparator(ids: string[]){
      let name = ids[0];
      for( let i=1; i<ids.length; i++ ){
          name += '-'+ids[i];
      }
      return name;
  }

  public removeSpaceCharacters(text: string){
      while( text.indexOf(' ')!=-1 ){
          text = text.replace(' ','');
      }
      return text;
  }

  public isNumberString(text: string){
      const NUBMERS = '0123456789';
      let ctn = 0;
      for(let i=0; i<text.length; i++){
          if( NUBMERS.indexOf(text[i])==-1 ){
              ctn++;
          }
      }
      return ctn;
  }

  public equals<T>(x1: T, x2: T): boolean{
      if( x1 instanceof Array && x2 instanceof Array ){
          if( x1.length !== x2.length ){
              return false;
          }
          x1=x1.sort();
          x2=x2.sort();
          for(let i=0; i<x1['length']; i++){
              if( x1 !== x2 ){
                  return false;
              }
          }
          return true;
      }else{
          throw new Error("merge this type not supported");
      }
  }

  public toString( arr: Array<any>, separator: string ){
      if( !arr ){
          throw new Error('arr is null reference');
      }else{
          if( arr.length == 0 ){
              throw new Error('arr length = 0');
          }else{
              let text = arr[0].toString();
              for(let i=1; i<arr.length; i++){
                  text += separator + arr[i].toString();
              }
              return text;
          }
      }
  }

  //обход элементов массива либо свойств обьекта
  public forEach( subject: any, action: any ){
      if( !subject ){
          console.warn('subject is null reference');
      }else{
          if( this.isArray(subject) ){
              for(let i=0; i<subject.length; i++){
                  action(i,subject[i]);
              }
          }else if( this.isObject(subject) ){
              const names = this.names(subject);
              this.forEach(names,(index, value)=>{
                  action(names[index], subject[value]);
              })
          }else{
              throw new Error( 'type of argument is not enumerable: '+subject);
          }
      }
  }

  //запрещает изменения свойств обьекта, разрешены только вызовы
  public seal(ref){
      return Object.seal(ref);
  }

  //наследование на уровне прототипов
  public extend( ref: any, proto: any ){
      let pref = ref;
      while( pref['__proto__']['constructor'].name !== 'Object' ){
          pref = pref['__proto__'];
      }
      const temp = pref['__proto__'];
      pref['__proto__'] = proto;
      proto['__proto__'] = temp;
  }

  //исключение наследования на уровне прототипов
  public unextend( ref: any, proto: any ){
      let pref = ref;
      while( pref['constructor'].name !== 'Object' ){
          if( Object.is(pref['__proto__'],proto) ){
              pref['__proto__']=proto['__proto__'];
              break;
          }else{
              pref = pref['__proto__'];
          }
      }
      throw new Error('unextend operation failed');
  }

  //возвращает ссылки по всей иерархии наследования
  public extensions( ref: any ){
      const pextensions = [];
      let pref = ref;
      while( pref && pref['__proto__']['constructor'].name !== 'Object' ){
          pextensions.push( pref );
          pref = pref['__proto__'];
      }
      return pextensions;
  }

  //возвращает вермя в милисекундах
  public timems(){
      const pdate = new Date();
      return (pdate.getHours() * 60 * 60 * 1000) + (pdate.getMinutes() * 60 * 1000) + (pdate.getSeconds() * 1000) + pdate.getMilliseconds();
  }

  //перечень идентификаторов
  public indexes( ref: any ){

      return Object.getOwnPropertyNames(ref);
  }

  //перечень идентификаторов
  public keys( ref: any ){
      const keys = [];
      for(let key in ref ){
          keys.push( key );
      }
      return keys;
  }

  public typeOf( value ){
      return typeof( value );
  }

  public isDate( value ){
      return value instanceof Date;
  }

  //свойства определенные в обьекте
  public names( ref ){
      return Object.getOwnPropertyNames(ref);
  }

  //првоерка является ли ссылка функцией
  public isFunction( p ){
      return (typeof(p) == 'function');
  }

  //првоерка является ли ссылка обьектом
  public isObject( p ){
      return (typeof(p) == 'object');
  }

  //првоерка является ли ссылка массивом
  public isArray( p ){
      return (typeof(p) == 'object') && (p instanceof Array);
  }

  /**
   * Возвращае сроки с временем
   */
  public time(){
      let now = new Date();
      let h = now.getHours().toString();
      let m = now.getMinutes().toString();
      let s = now.getSeconds().toString();
      let ms = now.getMilliseconds().toString();
      h = h.length==1 ? "0"+h: h;
      m = m.length==1 ? "0"+m: m;
      s = s.length==1 ? "0"+s: s;
      while( ms.length != 4 ){
          ms = "0"+ms;
      }
      return h+":"+m+":"+s+"."+ms;
  }

}
