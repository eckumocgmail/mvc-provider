
using ApplicationDb.Types;
using System.Collections.Concurrent;

namespace AppAPI
{
    public interface APIActiveCollection<T>: APICollection<T> where T : ActiveObject
    {
        void DoCheck();
        ConcurrentDictionary<string, object> GetSession(string key);
        ConcurrentDictionary<string, T> GetMemory();
    }
}
