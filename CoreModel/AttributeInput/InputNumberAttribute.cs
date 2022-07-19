using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

[EntityLabel("Численный тип")]
public class InputNumberAttribute : InputTypeAttribute
{
    public InputNumberAttribute() : base(InputTypes.Number) { }
    public InputNumberAttribute( string expression = null) : base(InputTypes.Number)
    {
    }
}

