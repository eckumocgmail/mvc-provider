using NetCoreConstructorAngular.Data.DataAttributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

[EntityLabel("Текстовое поле")]
public class InputTextAttribute : InputTypeAttribute, MyValidation
{
    private string _message;

    public InputTextAttribute() : base(InputTypes.MultilineText) { }
    public InputTextAttribute(string message =null): base(InputTypes.MultilineText)
    {
        _message = message;
    }

    public string GetMessage(object model, string property, object value)
    {
        if(string.IsNullOrEmpty(_message))
        {
            return "Значение свойство не является тестовым значением";
        }
        else
        {
            return _message;
        }

    }

    public string Validate(object model, string property, object value)
    {
        if( value != null)
        {
            if(value is String == false)
            {
                return GetMessage(model, property, value);
            }
        }
        return null;
    }
}

