using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

public class LabelAttribute : DisplayNameAttribute
{
    public LabelAttribute(string text): base( text )
    {
    }
}