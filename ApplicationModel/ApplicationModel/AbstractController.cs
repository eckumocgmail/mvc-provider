using ApplicationDb.Entities;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationModel.ApplicationModel
{
    public class AbstractController : Controller
    {
        
        public AbstractController(IServiceProvider ServiceProvider)
        {
            this.OnServiceProvider(ServiceProvider);
        }

        private void OnServiceProvider(IServiceProvider serviceProvider)
        {
             
        }
    }
}
