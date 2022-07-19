using NetCoreConstructorAngular.Data.DataAttributes;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

 
public class TextLengthAttribute: Attribute, MyValidation
{
    private readonly int _min;
    private readonly int _max;
    private readonly string _message;

    public TextLengthAttribute(int min, int max, string message)
    {
        if( min < 0 || min > max)
        {
            throw new Exception("Значения атрибута TextLengthAttribute заданы некорректно");
        }
        _min = min;
        _max = max;
        _message = message;
    }

    public string GetMessage(object model, string property, object value)
    {
        if (string.IsNullOrEmpty(this._message))
        {
            return "Миниманое кол-во символов "+_min+" максимальное "+_max;
        }
        else
        {
            return _message;
        }
    }

    public string Validate(object model, string property, object value)
    {
        if( value == null)
        {
            return GetMessage(model,property,value);
        }
        else
        {
            if( value.ToString().Length>=_min && value.ToString().Length <= _max)
            {
                return null;
            }
            else
            {
                return GetMessage(model, property, value);
            }
        }
    }
}
 