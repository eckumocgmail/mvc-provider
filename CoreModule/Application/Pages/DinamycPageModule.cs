using LibModule.Application;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;



namespace LibModule.Pages
{
    public abstract class DynamicPageModule : PageModule
    {

        public abstract IEnumerable<PageModule> GetPageModules();

        public override IEnumerable<WidgetModule> GetWidgetModules()
        {
            HashSet<WidgetModule> widgets = new HashSet<WidgetModule>();
            foreach (var page in GetPageModules())
            {
                foreach (var widget in page.GetWidgetModules())
                {
                    widgets.Add(widget);
                }
            }
            return widgets;
        }

        
        public override void ConfigureRouter(object options)
        {

        }

        public override Assembly GetApplicationPartAssembly()
        {
            return GetType().Assembly;
        }
    }
}
