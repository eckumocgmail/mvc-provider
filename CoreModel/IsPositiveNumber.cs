using NetCoreConstructorAngular.Data.DataAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class IsPositiveNumber : Attribute, MyValidation
{
    private readonly string _message;

    public IsPositiveNumber(string message)
    {
        _message = message;
    }
    public string GetMessage(object model, string property, object value)
    {
        if (string.IsNullOrEmpty(_message))
        {
            return "Значение должно быть положительным";
        }
        else
        {
            return _message;
        }
    }

    public string Validate(object model, string property, object value)
    {
        if (false)
        {
            return GetMessage(model, property, value);
        }
        else
        {
            return null;
        }
    }
}