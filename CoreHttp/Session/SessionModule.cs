using CoreHttp.Session;

using LibModule.Application;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using WebHttpCommon;

namespace HttpSession
{
    public class SessionModule: ServiceModule 
    {

        public SessionModule()
        {
            Imports.Add(new HttpCommonModule());
        }
        public override void OnConfigureServices(IServiceCollection services)
        {

            services.AddSingleton<SessionOptionsService>();
            services.AddSingleton<SessionSingletonService<ViewContextDefault>>();
            services.AddScoped<UserModelsService>();
            services.AddScoped<SessionTransientService<ViewContextDefault>>();
            
        }

        public override void OnConfigureMiddleware(IApplicationBuilder app)
        {
          
        }

        public override Action<IServiceCollection> OnConfigureBackground()
        {
            return (services) =>
            {
                Info("OnConfigureBackground");
                services.AddSingleton<SessionOptionsService>();
                services.AddSingleton<SessionSingletonService<ViewContextDefault>>();
                services.AddHostedService<SessionBackgroundService<ViewContextDefault>>();
            };
        }
    }
}
