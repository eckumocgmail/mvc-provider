using NetCoreConstructorAngular.Data.DataAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[EntityLabel("Процент")]
public class InputPercentAttribute : InputTypeAttribute, MyValidation
{
    private string _error;

    public InputPercentAttribute( ) : base(InputTypes.Percent) { }
    public InputPercentAttribute(string error) : base(InputTypes.Percent)
    {
        _error = error;
    }

    public string GetMessage(object model, string property, object value)
    {
        if (string.IsNullOrEmpty(_error))
        {
            return "Процент задаётся действительным числом в диапазоне от 0 до 100";
        }
        else
        {
            return _error;
        }
    }

    public string Validate(object model, string property, object value)
    {        
        int x = int.Parse(value.ToString());
        if (x < 0 || x > 100)
        {
            return GetMessage(model, property, value);
        }
        else
        {
            return null;
        }   
    }
}