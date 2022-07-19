using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComboboxView.Views.Shared.Combobox
{
    public class ComboboxViewComponent: ViewComponent
    {

        public IViewComponentResult Invoke()
        {
            return View("Combobox");
        }
    }
}
