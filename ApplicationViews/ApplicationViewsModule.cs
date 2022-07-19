using LibModule.Application;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationViews
{
    public class ApplicationViewsModule: SharedModule
    {
        protected override IEnumerable<WidgetModule> GetWidgetModules()
        {
            return new List<WidgetModule>()
            {
            };
        }
    }
}
