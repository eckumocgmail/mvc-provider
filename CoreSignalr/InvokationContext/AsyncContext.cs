using System;
using System.Collections.Concurrent;


/// <summary>
/// Область выполнения асинхронных операций
/// </summary>
public class AsyncContext
{
    private ConcurrentDictionary<string, Action<object>> Pool;
    private int SerialKeyLength = 32;
    private Random Random = new Random();


    public AsyncContext()
    {
        Pool = new ConcurrentDictionary<string, Action<object>>();
    }

    protected string Put(Action<object> Handle)
    {
        lock (this.Pool)
        {
            string SerialKey = GenerateSerialKey();
            Pool[SerialKey] = Handle;
            return SerialKey;
        }
    }


    protected Action<object> Take(string SerialKey)
    {
        lock (this.Pool)
        {
            Action<object> Handle = null;
            Pool.TryRemove(SerialKey, out Handle);
            return Handle;
        }
    }


    private string GenerateSerialKey()
    {
        string key;
        do
        {
            key = "";
            for (int i = 0; i < SerialKeyLength; i++)
            {
                key += (Math.Floor(Random.NextDouble() * 10)).ToString();
            }
        } while (Pool.ContainsKey(key));
        return key;
    }
}