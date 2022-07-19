using LibModule.Application;

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel
{
    public class ApplicationModelModule: ServiceModule
    {
        public override void OnConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseInMemoryDatabase(nameof(ApplicationDbContext));
                //options.UseSqlServer(ApplicationDbContext.DefaultConnectionString);
            });
        }

        public override void OnConfigureMiddleware(IApplicationBuilder app)
        {
             
        }
    }
}
