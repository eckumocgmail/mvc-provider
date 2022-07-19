using LibModule.Application;
using System.Collections.Generic;
using System.Reflection;

public class EntityCrudPageModule<TContext, TEntity> : PageModule
{
    public override void ConfigureRouter(object options)
    {
        
    }

    public override Assembly GetApplicationPartAssembly()
    {
        return GetType().Assembly;
    }

    public override IEnumerable<WidgetModule> GetWidgetModules()
    {
        return new List<WidgetModule>() { 
            //new EntitySearchWidgetModule(),
        };
    }
}