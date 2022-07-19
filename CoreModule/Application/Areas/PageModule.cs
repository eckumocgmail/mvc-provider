using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;

namespace LibModule.Application
{
    public abstract class PageModule: WidgetModule
    {
        private SharedModule _shared;

        public PageModule()
        {

        }

        public void SetSharedModule(SharedModule shared)
        {
            this._shared = shared;
        }


        public override void ConfigureMvc(IMvcBuilder mvc)
        {
            Info("ConfigureMvc();");
            mvc.AddApplicationPart(this.GetType().Assembly);//.AddRazorRuntimeCompilation();
            foreach(var widget in GetWidgetModules())
            {
                widget.ConfigureMvc(mvc);
            }
        }


        public abstract IEnumerable<WidgetModule> GetWidgetModules();

        public abstract void ConfigureRouter(object options);

        public override void OnConfigureServices(IServiceCollection services)
        {
            
        }

        public override void OnConfigureMiddleware(IApplicationBuilder app)
        {
            
        }

         
    }
}
