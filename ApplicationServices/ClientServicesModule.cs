using CoreModule.Application.Services;

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
    public class ClientServicesModule : CommonModule
    {
        public ClientServicesModule()
        {
            Imports.AddRange(GetServiceModules());
        }

        public override IEnumerable<ServiceModule> GetServiceModules()
        {
            return new List<ServiceModule>() { 
                new ClientAuthorizationModule()
            };
        }
    }
}
