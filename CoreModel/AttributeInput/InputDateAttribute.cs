using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

[EntityLabel("Дата")]
public class InputDateAttribute : InputTypeAttribute
{
    public InputDateAttribute( ) : base(InputTypes.Date)
    {
        
    }
}

