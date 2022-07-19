using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[EntityLabel("Отчётная неделя")]
public class InputWeekAttribute: InputTypeAttribute
{
    public InputWeekAttribute( ) : base(InputTypes.Week) { }
    public InputWeekAttribute(string exts) : base(InputTypes.Week)
    {
    }
}

