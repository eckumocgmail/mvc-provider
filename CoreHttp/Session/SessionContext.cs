using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;


public class SessionContext<TViewContext>: IDisposable
{
    public ConcurrentDictionary<Type, object> Context = new ConcurrentDictionary<Type, object>();
    public TViewContext ViewContext;


    public Func<string, object[], int> Invoke;
    public long Timestamp;
    public string ip;
    public bool IsLocked = false;
    
    public SessionContext(long timestamp)
    {
        //Writing.ToConsole("Created "+nameof(SessionContext));
        this.Timestamp = timestamp;
        ViewContext = (TViewContext)typeof(TViewContext).GetConstructors()[0].Invoke(new object[0]);
    }


    public TViewContext GetModels()
    {
        return (TViewContext)Get(typeof(TViewContext));
    }


    public TViewContext GetRoot()
    {
        return ((TViewContext)Get(typeof(TViewContext)));
    }


    public object Get(Type type)
    {
        if(Context.ContainsKey(type) == false)
        {
            Context[type]=CreateWithDefaultConstructor(type);
        }
        return Context[type];
    }


    private object GetById(Type type)
    {
        if (Context.ContainsKey(type))
        {
            return Context[type];
        }
        else
        {
            Context[type] = CreateWithDefaultConstructor(type);                
            return Context[type];
        }
    }


    private object CreateWithDefaultConstructor(Type type)
    {
        ConstructorInfo constructor = (from c in new List<ConstructorInfo>(type.GetConstructors()) where c.GetParameters().Length == 0 select c).SingleOrDefault();
        return constructor.Invoke(new object[0]);
    }


    /*public void ForEach(Action<ViewNode> action)
    {
        lock (Context)
        {
            foreach(var p in Context)
            {
                if(Context[p.Key]  is ViewNode)
                {
                    ((ViewNode)(Context[p.Key])).Do(action);
                }
            }
        }
    }*/


    public void Dispose()
    {            
        foreach (var p in Context)
        {     
            /*if(p.Value is ViewItem)
            {
                ((ViewItem)p.Value).Destroy();
            }*/
                    
        }
          
    }
}

