using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[EntityLabel("Отчётный месяц")]
public class InputMonthAttribute : InputTypeAttribute
{
    public InputMonthAttribute( ) : base(InputTypes.Month)
    {
    }
}

