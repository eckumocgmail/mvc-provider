using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LibModule.Application
{
    public abstract class DomainModule : PageModule
    {
        public DomainModule()
        {
        }

        public abstract IEnumerable<PageModule> GetPageModules();



        public override void ConfigureMvc(IMvcBuilder mvc)
        {
            Info("AddApplicationPart();");
            base.ConfigureMvc(mvc);
            foreach (var page in GetPageModules())
            {
                page.ConfigureMvc(mvc);
            }
        }


        public override void OnConfigureServices(IServiceCollection services)
        {
        }

        public override void OnConfigureMiddleware(IApplicationBuilder app)
        {
        }

        public override Action<IServiceCollection> OnConfigureBackground()
        {
            return (services) => { 
            };
        }

        public override IEnumerable<WidgetModule> GetWidgetModules()
        {
            HashSet<WidgetModule> widgets = new HashSet<WidgetModule>();
            foreach(var page in GetPageModules())
            {
                foreach(var widget in page.GetWidgetModules())
                {
                    widgets.Add(widget);
                }                
            }
            return widgets;
        }

        public override void ConfigureRouter(object options)
        {
            
        }

        public override Assembly GetApplicationPartAssembly()
        {
            return GetType().Assembly;
        }
    }
}
