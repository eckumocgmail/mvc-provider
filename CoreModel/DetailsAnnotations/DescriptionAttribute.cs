using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class DescriptionAttribute : Attribute
{
    private readonly string _message;

    public  DescriptionAttribute(string message)
    {
        _message = message;
    }
}