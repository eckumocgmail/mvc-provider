using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[EntityLabel("Пароль")]
public class InputPasswordAttribute : InputTypeAttribute
{
    public static string GetPasswordValue( object target ){
        object val = Attrs.GetValueMarkedByAttribute(target, nameof(InputPasswordAttribute));
        return val != null ? val.ToString(): "";
    }
    public InputPasswordAttribute( ) : base(InputTypes.Password)
    {

        
    }
}

