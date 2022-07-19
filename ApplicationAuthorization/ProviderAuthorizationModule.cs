using AppAPI;

using LibModule.Application;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using ServiceAuthorization;
using ServiceAuthorization.AuthorizationAPI;

namespace ApplicationServices
{
    public class ProviderAuthorizationModule : ServiceModule
    {
        public override void OnConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<APIUsers, AuthorizationUsers>();

            services.AddTransient<APIAuthorization, AuthorizationService>();
            services.AddSingleton<AuthorizationOptions>();

        }

        public override void OnConfigureMiddleware(IApplicationBuilder app)
        {
            app.UseMiddleware<CanActivateComponent>();
        }
    }
}