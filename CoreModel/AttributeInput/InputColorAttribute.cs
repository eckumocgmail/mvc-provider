using NetCoreConstructorAngular.Data.DataAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;


[EntityLabel("Цвет")]
public class InputColorAttribute : InputTypeAttribute, MyValidation
{
    private readonly string _error;

    public InputColorAttribute() : base(InputTypes.Color) { }
    public InputColorAttribute( string error ): base(InputTypes.Color)
    {
        _error = error;
    }

    public string GetMessage(object model, string property, object value)
    {
        if (string.IsNullOrEmpty(_error))
        {
            return "Значение не удовлетворяет условию:  "+ "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
        }
        else
        {
            return _error;
        }
    }

    public string Validate(object model, string property, object value)
    {        
        if(Regex.Match(value.ToString(), "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", RegexOptions.IgnoreCase).Success == false)
        {
            return GetMessage(model,property,value);
        }
        return null;
    }
}

