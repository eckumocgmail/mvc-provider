
using ApplicationModel.ApplicationModel;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Areas.CustomerFace.Controllers
{
    [Area("CustomerFace")]
    public class CustomerController : NavigationController
    {
        public CustomerController(UserModelsService service) : base(service)
        {

        }

        public IActionResult CustomerHome()
        {
            return View();
        }
    }
}

            