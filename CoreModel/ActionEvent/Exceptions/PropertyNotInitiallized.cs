using System;
using System.Runtime.Serialization;

[Serializable]
internal class PropertyNotInitiallized : Exception
{
    public PropertyNotInitiallized()
    {
    }

    public PropertyNotInitiallized(string message) : base(message)
    {
    }

    public PropertyNotInitiallized(string message, Exception innerException) : base(message, innerException)
    {
    }

    protected PropertyNotInitiallized(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }
}