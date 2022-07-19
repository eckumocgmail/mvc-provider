using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[EntityLabel("Дата/Время")]
public class InputDateTimeAttribute : InputTypeAttribute
{
    public InputDateTimeAttribute( ) : base(InputTypes.DateTime)
    {
    }
}

