using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

public class EntityLabelAttribute: DisplayNameAttribute
{
    public EntityLabelAttribute(string text) : base(text)
    {
    }
}