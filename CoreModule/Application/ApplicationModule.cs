using CoreModule.Application.Services;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibModule.Application
{
    public abstract class ApplicationModule: CoreModule
    {
        public ApplicationModule()
        {
            Imports.Add(GetCommonModule());
            Imports.Add(GetSharedModule());
            foreach (var domain in GetDomainModules())
            {
                Imports.Add(domain);

            }

        }

        public override void ConfigureServices(IServiceCollection services)
        {
            base.ConfigureServices(services);
       
        }

        public override void Configure(IApplicationBuilder app)
        {
            base.Configure(app);
            
        }

        public abstract IEnumerable<DomainModule> GetDomainModules();
        public abstract CommonModule GetCommonModule();
        public abstract SharedModule GetSharedModule();



        public abstract override void OnConfigureServices(IServiceCollection services);

        public abstract override void OnConfigureMiddleware(IApplicationBuilder app);

        
    }
}
