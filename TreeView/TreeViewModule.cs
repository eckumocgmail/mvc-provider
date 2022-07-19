using LibModule.Application;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace TreeView
{
    public class TreeViewModule: WidgetModule
    {
        public override void OnConfigureServices(IServiceCollection services)
        {
            
        }

        public override void OnConfigureMiddleware(IApplicationBuilder app)
        {
            
        }

        public override Assembly GetApplicationPartAssembly()
        {
            return typeof(TreeViewModule).Assembly;
        }
    }
}
