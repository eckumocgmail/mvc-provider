using System;

public class UnitsAttribute : Attribute
{
    private readonly string _postfix;

    public UnitsAttribute( string postfix ) {
        _postfix = postfix;
    }
}