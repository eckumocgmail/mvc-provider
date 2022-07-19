 

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LibModule.Application
{
    public abstract class WidgetModule: CoreModule
    {

        public virtual void ConfigureMvc(IMvcBuilder mvc)
        {
            Info("AddApplicationPart();");
            mvc.AddApplicationPart(this.GetType().Assembly);
        }

        public abstract Assembly GetApplicationPartAssembly();

        public abstract override void OnConfigureServices(IServiceCollection services);

        public abstract override void OnConfigureMiddleware(IApplicationBuilder app);
    }
}
