using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;

/// <summary>
/// Управление сеансом
/// </summary>
public class SessionSingletonService<TViewContext> where TViewContext: IDisposable
{
    private ConcurrentDictionary<string, SessionContext<TViewContext>> connections = 
        new ConcurrentDictionary<string, SessionContext<TViewContext>>();


    /// <summary>
    /// Получение контекста сеанса
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public SessionContext<TViewContext> GetById( string id )
    {
        if(connections.ContainsKey(id))
        {
            connections[id].Timestamp = GetTimestamp();
            return connections[id];
        }
        else
        {
            return connections[id] = new SessionContext<TViewContext>(GetTimestamp());
        }
    }


    /// <summary>
    /// Проверка наличия
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public bool ContainsKey(string id)
    {
        return connections.ContainsKey(id);
    }


    /// <summary>
    /// 
    /// </summary>
    /// <param name="timeout"></param>
    public async Task DoCheck(long timeout)
    {
        lock (connections)
        {
            List<string> removeList = new List<string>();
            foreach (var pair in connections)
            {
                SessionContext<TViewContext> session = pair.Value;
                if ((GetTimestamp() - session.Timestamp) > timeout)
                {
                    removeList.Add(pair.Key);
                }
                else
                {
                    Debug.WriteLine($"Обновление сеанса: {session.GetHashCode()}"); 
                   
                }
            }
            foreach (string key in removeList)
            {
                Invalidate(key);
            }
        }            
    }


    /// <summary>
    /// Уничтожение сессии
    /// </summary>
    /// <param name="key"></param>
    public void Invalidate(string key)
    {
        
        if (connections.ContainsKey(key))
        {
            SessionContext<TViewContext> session = null;
            connections.Remove(key, out session);
            if (session != null)
                session.Dispose();
        }     
        
    }


    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    public long GetTimestamp()
    {
        return (long)(((DateTime.Now - new DateTime(1970, 1, 1, 0, 0, 0))).TotalMilliseconds);
    }
}
