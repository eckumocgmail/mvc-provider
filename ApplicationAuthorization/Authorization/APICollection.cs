using System.Collections.Generic;

namespace AppAPI
{
    public interface APICollection<T>
    {
        bool Has(string key);
        T Take(string key);
        T Remove(string key);
        string Put(T item);
        string Find(T item);
        IList<T> GetAll();
        void RemoveAll();
    }
}
