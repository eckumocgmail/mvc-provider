
using NetCoreConstructorAngular.Data.DataAttributes;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

[EntityLabel("Электронная почта")]
[EntityIcon("email")]
public class InputEmailAttribute : InputTypeAttribute, MyValidation
{
    private readonly string _message;

    public InputEmailAttribute() : base(InputTypes.Email) { }
    public InputEmailAttribute(string message) : base(InputTypes.Email)
    {
        _message = message;
    }

    public string Validate(object model, string property, object value)
    {
        if(value == null)
        {
            return GetMessage(model,property,value);
        }
        string email = value.ToString();
        if (string.IsNullOrWhiteSpace(email))
            return GetMessage(model, property, value);

        try
        {
            // Normalize the domain
            email = Regex.Replace(email, @"(@)(.+)$", DomainMapper,
                                  RegexOptions.None, TimeSpan.FromMilliseconds(200));

            // Examines the domain part of the email and normalizes it.
            string DomainMapper(Match match)
            {
                // Use IdnMapping class to convert Unicode domain names.
                var idn = new IdnMapping();

                // Pull out and process domain name (throws ArgumentException on invalid)
                string domainName = idn.GetAscii(match.Groups[2].Value);

                return match.Groups[1].Value + domainName;
            }
        }
        catch (RegexMatchTimeoutException e)
        {
            return GetMessage(model, property, value);
        }
        catch (ArgumentException e)
        {
            return GetMessage(model, property, value); ;
        }

        try
        {
            if(Regex.IsMatch(email,
                @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250)))
            {
                return null;
            }
            else
            {
                return GetMessage(model, property, value);
            }
        }
        catch (RegexMatchTimeoutException)
        {
            return GetMessage(model, property, value);
        }
    }

 
    public string GetMessage(object model, string property, object value)
    {
        if (_message == null)
        {
            return "Не правильно укаазан адрес электронной почты";
        }
        else
        {
            return _message;
        }
    }
}

