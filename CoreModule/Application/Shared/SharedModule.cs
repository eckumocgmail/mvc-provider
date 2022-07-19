 

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibModule.Application
{

    public abstract class SharedModule : CoreModule
    {

        public SharedModule()
        {
            foreach (WidgetModule p in GetWidgetModules())
            {
                Imports.Add(p);
                Exports.Add(p);
            }
        }

        protected abstract IEnumerable<WidgetModule> GetWidgetModules();


        public override void OnConfigureServices(IServiceCollection services)
        {
        }

        public override void OnConfigureMiddleware(IApplicationBuilder app)
        {
        }

    }
}
