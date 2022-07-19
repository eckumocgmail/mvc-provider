using ApplicationLogic.Areas;
 

using LibModule;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVC
{
    public class MVCModule: ApplicationLogicModule
    {


        public override void OnConfigureMiddleware(IApplicationBuilder app)
        {
            app.UseMiddleware<CanActivateComponent>();
            foreach (var p in this.Imports)
            {
                p.OnConfigureMiddleware(app);
            }
            app.UseDeveloperExceptionPage();
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

     
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{area=}/{controller=Home}/{action=Index}/{id?}");
            });
            
        }
    }
}
