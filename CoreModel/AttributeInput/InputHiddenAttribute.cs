using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[EntityLabel("Скрытое свойство")]
public class InputHiddenAttribute: Attribute
{
    public InputHiddenAttribute() { }
    public InputHiddenAttribute(bool value)
    {
    }
}

