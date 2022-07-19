using NetCoreConstructorAngular.Data.DataAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading.Tasks;


public class MatchAttribute : Attribute, MyValidation
{
    private string _expression;
    private readonly string _message;

    public MatchAttribute(string expression, string message)
    {
        _expression = expression;
        _message = message;

    }

    public static object GetValue(object i, string v)
    {
        PropertyInfo propertyInfo = i.GetType().GetProperty(v);
        FieldInfo fieldInfo = i.GetType().GetField(v);
        return
            fieldInfo != null ? fieldInfo.GetValue(i) :
            propertyInfo != null ? propertyInfo.GetValue(i) :
            null;

    }

    public string Validate(object model, string property, object value)
    {
        if (!Regex.Match(GetValue(model, property).ToString(), _expression, RegexOptions.IgnoreCase).Success)
        {
            return GetMessage(model,property,value);
        }
        else
        {
            return null;
        }
    }

    public string GetMessage(object model, string property, object value)
    {
        if (string.IsNullOrEmpty(_message))
        {
            return "Значение не соответвует выражению "+this._expression;
        }
        else
        {
            return _message;
        }
    }
}

