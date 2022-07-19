using NetCoreConstructorAngular.Data.DataAttributes;


[EntityLabel("Номер телефона")]
public class InputPhoneAttribute : InputTypeAttribute, MyValidation
{
    private string _message;

    public InputPhoneAttribute() : base(InputTypes.Phone) { }
    public InputPhoneAttribute(string message) : base(InputTypes.Phone)
    {
        _message = message;
    }

    private bool isNumber( char ch )
    {
        return "0123456789".IndexOf(ch) != -1;
    }

    public string Validate(object model, string property, object value)
    {
        
        if (value==null)
        {
            return GetMessage(model,property,value);
        }
        else
        {
            string message = value.ToString();
            if (message.Length != "7-904-334-1124".Length)
            {
                return GetMessage(model, property, value);
            }
            else
            {
                
                if (message[1] != '-' || message[5] != '-' || message[9] != '-')
                {
                    return GetMessage(model, property, value);
                }
                else
                {
                    if (isNumber(message[0]) == false ||
                        isNumber(message[2]) == false || isNumber(message[3]) == false || isNumber(message[4]) == false ||
                        isNumber(message[6]) == false || isNumber(message[7]) == false || isNumber(message[8]) == false ||
                        isNumber(message[10]) == false || isNumber(message[11]) == false ||
                        isNumber(message[12]) == false || isNumber(message[13]) == false)
                    {
                        return GetMessage(model, property, value);
                    }
                }
            }
        }
        return null;
    }

    public string GetMessage(object model, string property, object value)
    {
        if (string.IsNullOrEmpty(this.ErrorMessage))
        {
            return "Номер телефона задаётся в формате X-XXX-XXX-XXXX";
        }
        else
        {
            return ErrorMessage;
        }
    }
}

