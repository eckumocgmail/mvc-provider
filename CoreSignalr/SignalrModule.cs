using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreSignalr
{
    public class SignalrModule: LibModule.CoreModule
    {
        public override void OnConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();
        }

        public override void OnConfigureMiddleware(IApplicationBuilder app)
        {            
            
        }
    }
}
