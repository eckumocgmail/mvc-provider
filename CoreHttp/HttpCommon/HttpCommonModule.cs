using LibModule;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebHttpCommon
{
    public class HttpCommonModule: LibModule.CoreModule
    {
        public override void OnConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddTransient<CookieManager>();
        }

        public override void OnConfigureMiddleware(IApplicationBuilder app)
        {
 
        }

        
    }
}
