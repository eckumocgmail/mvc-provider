using System;

public class SystemEntityAttribute : Attribute
{
    private readonly string _message;

    public  SystemEntityAttribute(string message = "")
    {
        _message = message;
    }
}