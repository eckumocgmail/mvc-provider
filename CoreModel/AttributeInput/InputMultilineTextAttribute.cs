using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

[EntityLabel("Многострочный комментарий")]
public class InputMultilineTextAttribute : InputTypeAttribute
{
    public InputMultilineTextAttribute() : base(InputTypes.MultilineText) { }
    public InputMultilineTextAttribute(string expression =null): base(InputTypes.MultilineText)
    {
    }
}

