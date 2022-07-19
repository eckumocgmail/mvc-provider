using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MVC.Views.Shared.Components.Menu
{
    public class MenuViewComponent: ViewComponent
    {

        public IViewComponentResult Invoke()
        {
            return View("Menu");
        }
    }
}
