using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace LibModule
{
    public abstract class CoreModule 
    {

 
        public string Name { get; set; }
        public string Description { get; set; }


        public List<CoreModule> Imports { get; set; } = new List<CoreModule>();
        public List<CoreModule> Exports { get; set; } = new List<CoreModule>();

        public virtual Task<Func<HttpContext, Task>> GetPreHandleFunction()
        {
            return new Task<Func<HttpContext, Task>>(() => {
                return async (http) =>
                {
                    await InfoAsync("GetPreHandleFunction");
                };
            }); 
        }
        public virtual Task<Func<HttpContext, Task>> GetPostHandleFunction()
        {
            return new Task<Func<HttpContext, Task>>(() => {
                return async (http) =>
                {
                    await InfoAsync("GetPostHandleFunction");
                };
            });
        }


        /// <summary>
        /// Вывод сообщения в консоль
        /// </summary>
        /// <param name="message"></param>
        protected async Task InfoAsync(object item)
        {
            string message = $"[{GetType().Name}][{DateTime.Now}] => {item}";
            Debug.WriteLine(message);
            Console.WriteLine(message);
        }

        /// <summary>
        /// Вывод сообщения в консоль
        /// </summary>
        /// <param name="message"></param>
        protected void Info(object item)
        {
            string message = $"[{GetType().Name}][{DateTime.Now}] => {item}";
            Debug.WriteLine(message);
            Console.WriteLine(message);
        }



        /// <summary>
        /// Получение коллекции сборок
        /// </summary>
        /// <returns></returns>
        public HashSet<Assembly> GetAssemblies()
        {  
            var list = new HashSet<Assembly>();
            list.Add(GetType().Assembly);
            Func<HashSet<Assembly>, HashSet<Assembly>, HashSet<Assembly>> Concatenation = (l,r) => { 
                foreach(var item in r)
                {
                    l.Add(item);
                }
                return l;
            };
                
            Imports.ForEach(p => Concatenation(list,p.GetAssemblies()));            
            return list;
        }



        public abstract void OnConfigureServices(IServiceCollection services);
        public virtual void ConfigureServices(IServiceCollection services)
        {
            Info("ConfigureServices(...)");
            OnConfigureServices(services);
            foreach (var childModule in Imports)
            {
                childModule.ConfigureServices(services);
            }            
        }



        

        public abstract void OnConfigureMiddleware(IApplicationBuilder app);
        public virtual void Configure( IApplicationBuilder app )
        {
            Info("Configure(...)");
            OnConfigureMiddleware(app);
            foreach (var childModule in Imports)
            {
                childModule.Configure(app);
            }
            app.Use(async (context, next) =>
            {
                await (await GetPreHandleFunction())(context);
                await next.Invoke();
                await (await GetPostHandleFunction())(context);
            });
        }


        public virtual Action<IServiceCollection> OnConfigureBackground()
        {
            return (services) =>
            {
            };
        }





        public List<Action<IServiceCollection>> GetBackgroundConfigureServicesLink( )
        {            
            List<Action<IServiceCollection>> todo = new List<Action<IServiceCollection>>();
            todo.Add(OnConfigureBackground());
            foreach (var childModule in Imports)
            {
                Info("GetBackgroundConfigureServicesLink(...)");
                todo.AddRange(childModule.GetBackgroundConfigureServicesLink());
            }
            return todo;
        }


    }
}
