using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[EntityLabel("Время")]
[EntityIcon("access_time")]
public class InputTimeAttribute : InputTypeAttribute
{
    public InputTimeAttribute( ) : base(InputTypes.Time)
    {
    }
}

