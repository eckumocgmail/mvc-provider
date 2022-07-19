using ApplicationLogic.Areas.AnaliticFace;

using ApplicationServices;

using ApplicationViews;

using CoreModule.Application.Services;

using LibModule.Application;

using Microsoft.Extensions.DependencyInjection;
using MVC.Areas.AdminFace;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLogic.Areas
{
    public abstract class ApplicationLogicModule : ApplicationModule
    {
        public ApplicationLogicModule()
        {
            Imports.Add(GetCommonModule());
            Imports.Add(GetSharedModule());
            foreach(var domain in GetDomainModules())
            {
                Imports.Add(domain);
            }
        }

        public override IEnumerable<DomainModule> GetDomainModules()
        {
            return new List<DomainModule>() { 
                new AdminModule(),
                new AnaliticModule(),
                new BossModule(),
                new CustomerModule(),
                new DeveloperModule(),
                new ReceptionModule(),
                new SupportModule(),
                new WorkerModule()
            };
        }


        public override void OnConfigureServices(IServiceCollection services)
        {
            var mvc = services.AddControllersWithViews();
            foreach(var domain in GetDomainModules())
            {
                domain.ConfigureMvc( mvc );
            }
        }

        public override SharedModule GetSharedModule()
        {
            return new ApplicationViewsModule();
        }

        public override CommonModule GetCommonModule()
        {
            return new ApplicationServicesModule();
        }


    }
}
