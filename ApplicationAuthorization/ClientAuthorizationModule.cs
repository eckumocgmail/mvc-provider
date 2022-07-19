using AppAPI;

using LibModule.Application;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using ServiceAuthorization.AuthorizationAPI;

namespace ApplicationServices
{
    public class ClientAuthorizationModule : ServiceModule
    {
        public override void OnConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<APIUsers, AuthorizationUsers>();

            services.AddTransient<APIAuthorization, AuthorizationClientService>();
            services.AddSingleton<AuthorizationOptions>();
        }

        public override void OnConfigureMiddleware(IApplicationBuilder app)
        {
            app.UseMiddleware<CanActivateComponent>();
        }
    }
}