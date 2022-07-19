using NetCoreConstructorAngular.Data.DataAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[EntityLabel("URL-адрес")]
public class InputUrlAttribute : InputTypeAttribute, MyValidation
{
    private readonly string ErrorMessage;

    public InputUrlAttribute() : base(InputTypes.Url) { }
    public InputUrlAttribute( string ErrorMessage) : base(InputTypes.Url)
    {
        this.ErrorMessage = ErrorMessage;
    }

    public string GetMessage(object model, string property, object value)
    {
        if( string.IsNullOrEmpty(ErrorMessage))
        {
            return "Некорректно задан URL адрес";
            
        }
        else
        {
            return ErrorMessage;
        }
    }

    public string Validate(object model, string property, object value)
    {
        if (value == null)
        {
            return GetMessage(model, property,value);
        }
        else
        {
            string textValue = value.ToString();

            if(Validation.IsValidUrl(textValue) == false)
            {
                return GetMessage(model, property, value);
            }
            else
            {
                return null;
            }            
        }        
    }
}

