using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

[Serializable]
public class PropertyValidationException : Exception
{
    public readonly List<string> _errors;
    private string key;
    private string message;

    public PropertyValidationException()
    {
    }

    public PropertyValidationException(string message) : base(message)
    {
    }

    public PropertyValidationException(string message, List<string> errors) : base(message)
    {
        _errors = errors;
    }

    public PropertyValidationException(string key, string message): base( $"Проверка свойства {key}:  {message}" )
    {
        this.key = key;
        this.message = message;
    }

    public PropertyValidationException(string message, Exception innerException) : base(message, innerException)
    {
    }

    protected PropertyValidationException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }
}