using System;

/// <summary>
/// Сообщение передаваемое в качестве события
/// </summary>
public class CommonEventMessage<T>: EventArgs
{
    public DateTime Created { get; } = DateTime.Now;
    public T Target { get; }

    public CommonEventMessage( T Target ) {
        this.Target = Target;
    }
}



