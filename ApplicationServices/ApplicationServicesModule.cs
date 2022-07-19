using ApplicationModel;

using CoreModule.Application.Services;

using HttpSession;

using LibModule.Application;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationServices
{
    public class ApplicationServicesModule: CommonModule
    {
        public ApplicationServicesModule()
        {
            Imports.AddRange(GetServiceModules());
        }

        public override void OnConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<INotificationsService, NotificationsService>();
        }


        public override IEnumerable<ServiceModule> GetServiceModules()
        {
            return new List<ServiceModule>() { 
                new ProviderAuthorizationModule(),
                new SessionModule(),
                new ApplicationModelModule()
            };
        }
    }
}
