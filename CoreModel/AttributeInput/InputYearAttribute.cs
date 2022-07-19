using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[EntityLabel("Год")]
public class InputYearAttribute : InputTypeAttribute
{
    public InputYearAttribute() : base(InputTypes.Year)
    {
    }
}

