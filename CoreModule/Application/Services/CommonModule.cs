

using LibModule.Application;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreModule.Application.Services
{
    public abstract class CommonModule: LibModule.CoreModule
    {

        public abstract IEnumerable<ServiceModule> GetServiceModules();


        public CommonModule()
        {
            
        }

        public override void OnConfigureServices(IServiceCollection services)
        {
            Info("OnConfigureServices");

            foreach (var p in GetServiceModules())
            {
                p.OnConfigureServices(services);
            }
        }

        public override void OnConfigureMiddleware(IApplicationBuilder app)
        {
            Info("OnConfigureMiddleware");
            foreach (var p in GetServiceModules())
            {
                p.OnConfigureMiddleware(app);
            }
        }
    }
}
