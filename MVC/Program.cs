
using ApplicationServices.ApplicationServices.PublicServices;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVC
{
    public class Program
    {
        public static void Main(string[] args)
        {
            NewsService.WhenLaunched();
            var hostBuilder = Host.CreateDefaultBuilder(args);
            var module = new MVCModule();
            hostBuilder = hostBuilder.ConfigureWebHostDefaults(webBuilder =>
            {                
                webBuilder.UseStartup<MVCModule>();
            });
            module.GetBackgroundConfigureServicesLink().ForEach(nextAction =>
            {
                hostBuilder = hostBuilder.ConfigureServices(nextAction);
            });
            hostBuilder.Build().Run();
        }

         
    }
}
