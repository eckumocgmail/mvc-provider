using LibModule.Application;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProxyGateway.Middleware;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVC.Areas.AdminFace
{
    public class AdminModule : DomainModule
    {

        public override void OnConfigureServices(IServiceCollection services)
        {
            Console.WriteLine("Регистрация функций администратора");
            services.AddDbContext<AdminDbContext>(options => {
                options.UseInMemoryDatabase("AdminDbContext");
            });
            services.AddHttpClient();             
        }

        public override void OnConfigureMiddleware(IApplicationBuilder app)
        {
            Console.WriteLine("Регистрация ПО администратора");
            app.UseProxyServer();
        }

        public override IEnumerable<PageModule> GetPageModules()
        {
            return new List<PageModule>() { 
                new EntityCrudPageModule<ApplicationDbContext,ProxyDataModel>()
            };
        }
    }
}
