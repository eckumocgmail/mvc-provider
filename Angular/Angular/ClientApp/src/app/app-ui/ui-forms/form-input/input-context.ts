/**
 * Бизнес правило регистрации информации в базу данных
 */
type attribute = {}
type description = {[property: string]: attribute}
type descriptor = {[property: string]: description};
type context =  {[property: string]: descriptor}
export const input: context = {};

/**
 * Сохранение маркеров свойств в контекст ввода
 * @param annotation - имя функции посредника атрибута
 * @param args - аргументы вызова функции
 * @param type - класс определяющий свойства
 * @param property - имя свойства
 */
export function markProperty(
            annotation: string,
            args: IArguments,
            type: string,
            property: string )
{
  if(!input[type]){
    input[type] = {};
  }
  if(!input[type][property]){
    input[type][property] = {};
  }
  input[type][property][annotation]=args;
}



/**
 * Маркеры моделей
 **/
export const spec: descriptor = {};

/**
 * Сохранение маркеров модели данных
 * @param annotation - имя функции посредника атрибута
 * @param args - аргументы вызова функции
 * @param type - класс определяющий свойства
 */
export function markModel(
  annotation: string,
  args: IArguments,
  type: string )
{
  if(!spec[type]){
    spec[type] = {};
  }
  spec[type][annotation]=args;
}

