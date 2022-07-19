


using AppAPI;
using ApplicationDb.Types;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;


/// <summary>
/// Коллекция объектов сеанса
/// </summary>
/// <typeparam name="T">Тип обьектов сеанса</typeparam>
public abstract class AuthorizationCollection<T>: APIActiveCollection<T> where T : ActiveObject
{
    protected readonly ILogger<AuthorizationCollection<T>> _logger;
    private readonly AuthorizationOptions _options;
    protected readonly ConcurrentDictionary<string, T> _memory;
    protected readonly ConcurrentDictionary<string, ConcurrentDictionary<string, object>> _sessions;
    private readonly int _keylength;

    protected AuthorizationCollection( 
                ILogger<AuthorizationCollection<T>> logger,
                AuthorizationOptions options)
    {
        this._logger = logger;
        this._options = options;
        this._keylength = options.KeyLength;
        this._memory = new ConcurrentDictionary<string, T>();
        this._sessions = new ConcurrentDictionary<string, ConcurrentDictionary<string, object>>();
        //this._logger.LogInformation("Create");
    }

    public ConcurrentDictionary<string, T> GetMemory()
    {
        return _memory;
    }


    /// <summary>
    /// Метод получения контекста сеанса
    /// </summary>
    /// <param name="key">ключ доступа</param>
    /// <returns></returns>
    public ConcurrentDictionary<string,object> GetSession(string key)
    {
        if(_sessions.ContainsKey(key))
        {
            return _sessions[key];
        }
        else
        {
            return null;
        }
    }


    /// <summary>
    /// Получение всех обьектов коллекции 
    /// </summary>
    /// <returns>список обьектов</returns>
    public IList<T> GetAll()
    {
        return new List<T>(_memory.Values);
    }


    /// <summary>
    /// Метед уничтожения сервиса
    /// </summary>
    public void Dispose()
    {
        //_logger.LogInformation("Dispose()");
        this.RemoveAll();
    }


    /// <summary>
    /// Выполнение проверки активности обьектов данной коллекции,
    /// при условии отсутствии активности обьект извлекается
    /// </summary>
    public void DoCheck()
    {
        GenerateKey();
        long timestamp = this.GetTimestamp();
        foreach (var pair in this._memory)
        {
            ActiveObject user = pair.Value;
            if (user.LastActive < (timestamp - this._options.SessionTimeout))
            {
                this.Remove(pair.Key);
            }
        }            
    }
        

    /// <summary>
    /// Получение ссылки на обьект по заданному ключу
    /// </summary>
    /// <param name="key">ключ доступа</param>
    /// <returns>ссылка на обьект</returns>
    public T Take( string key )
    {
        //this._logger.LogInformation($"Take({key})");
        if ( this._memory.ContainsKey(key))
        {
            T target = this._memory[key];
            target.LastActive = GetTimestamp();
            return target;
        }
        else
        {
            return null;
        }
    }


    /// <summary>
    /// Извлечение обьекта с заданным ключом из коллекции
    /// </summary>
    /// <param name="key">ключ доступа </param>
    /// <returns>ссылка на объект </returns>
    public T Remove(string key)
    {
        this._logger.LogInformation($"Remove({key})");
        if (this._memory.ContainsKey(key))
        {
            ConcurrentDictionary<string, object> targetSession = null;
            T target = null;
            this._memory.TryRemove(key, out target);
            this._sessions.TryRemove(key, out targetSession);
            foreach(object model in new List<object>(targetSession.Values))
            {
                if(model is IDisposable)
                {
                    IDisposable disposable = (IDisposable)model;
                    disposable.Dispose();
                }
            }
            target.IsActive = false;
            target.SecretKey = "";
            return target;
        }
        else
        {
            return null;
        }
    }


    /// <summary>
    /// Извлечение всех обьектов из коллекции
    /// </summary>
    public void RemoveAll()
    {
        foreach (var pair in this._memory)
        {
            this.Remove(pair.Key);
        }
    }


    /// <summary>
    /// Поиск обьекта в коллекции
    /// </summary>
    /// <param name="item">ссылка на обьект</param>
    /// <returns>ключ доступа</returns>
    public string Find(T item)
    {
        this._logger.LogInformation($"Find({item})");
        foreach (var pair in this._memory)
        {
            T user = pair.Value;
            if (user.Equals(item))
            {
                return pair.Key;
            }
        }
        return null;
    }


    /// <summary>
    /// Добавление обьекта в коллекцию
    /// </summary>
    /// <param name="item"> ссылка на обьект</param>
    /// <returns>ключ доступа к обьекту</returns>
    public virtual string Put(T item)
    {            
        this._logger.LogInformation($"Put({item})");
        lock (this._sessions)
        {
            string key = this.GenerateKey();
            this._memory[key] = item;
            this._sessions[key] = new ConcurrentDictionary<string, object>();
            item.IsActive = true;
            item.LastActive = GetTimestamp();
            item.SecretKey = key;
            return key;
        }
    }


    /// <summary>
    /// Вычисление уникального ключа в данном контексте
    /// </summary>
    /// <returns> уникальный ключ </returns>
    private string GenerateKey()
    {
        string key = null;
        do
        {
            key = RandomString();
        } while (this._memory.ContainsKey(key));
        return key;
    }


    /// <summary>
    /// Получение случайной последовательности символов
    /// </summary>
    /// <returns> последовательность символов </returns>
    private string RandomString()
    {
        Random random = new Random();
        string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToLower() +
                        "0123456789";
        return new string(Enumerable.Repeat(chars, this._keylength)
                            .Select(s => s[random.Next(s.Length)]).ToArray());
    }


    /// <summary>
    /// Получение текущего времени в милисекундах
    /// </summary>
    /// <returns></returns>
    protected long GetTimestamp()
    {
        return (long)(((DateTime.Now - new DateTime(1970, 1, 1, 0, 0, 0))).TotalMilliseconds);
    }


    /// <summary>
    /// Проверка наличия обьекта с заданным ключом
    /// </summary>
    /// <param name="key"></param>
    /// <returns></returns>
    public bool Has(string key)
    {
        return this._memory.ContainsKey(key);
    }
}

