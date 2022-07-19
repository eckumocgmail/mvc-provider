using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var hostBuilder = Host.CreateDefaultBuilder(args);
            var module = new AngularModule();
            hostBuilder = hostBuilder.ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<AngularModule>();
            });
            module.GetBackgroundConfigureServicesLink().ForEach(nextAction =>
            {
                hostBuilder = hostBuilder.ConfigureServices(nextAction);
            });
            hostBuilder.Build().Run(); 
             
        }

       
    }
}
