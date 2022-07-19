using System;
using System.Reflection;

/// <summary>
/// Вспомогательные методы вызова методов обявленных согласно правилу наименования обработчиков событий.
/// (!) Обработчик событий именуется по маске [id = "On"+$"{Event}"]
/// (@) Например обработчик нажатия левой кнопки мыши должен быть обьявлен как OnClick( .... ),
/// </summary>
public class InvokeHelper
{

    /// <summary>
    /// Вызов метода связанного определённым событием согласно правилу именования обработчиков событий
    /// </summary>
    /// <param name="target">Целевой обьект реализующий функцию обработки</param>
    /// <param name="type">Тип события</param>
    /// <param name="args">Полученное сообщение</param>
    /// <returns>Результат выполнения функции обработки</returns>
    public static object Do( object target, string type, object args ) 
    {
        if (string.IsNullOrEmpty(type))
        {
            throw new NullReferenceException("Тип события не определён");
        }
        string methodName = "On" + type.Substring(0, 1).ToUpper() + type.Substring(1).ToLower();
        MethodInfo method = target.GetType().GetMethod(methodName);
        if( method == null)
        {
            throw new Exception("Обработчик событий "+methodName+" не обьявлен ");
        }
        else
        {
            return method.Invoke(target,new object[] { args });
        }
    }

    public static object Do(object target, string action)
    {
        //имя функции обработки события
        string methodName = action.Substring(0, 1).ToUpper() + action.Substring(1).ToLower();
        MethodInfo method = target.GetType().GetMethod(methodName);
        if (method == null)
        {
            throw new Exception("Обработчик событий " + methodName + " не обьявлен ");
        }
        else
        {
            return method.Invoke(target, new object[] {  });
        }
    }
}
 
