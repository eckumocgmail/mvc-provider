
using ApplicationModel.ApplicationModel;

using CoreHttp.Session;

using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Areas.SupportFace.Controllers
{
    [Area("SupportFace")]
    public class SupportController : NavigationController
    {
        public SupportController(UserModelsService service) : base(service)
        {

        }

        public IActionResult SupportHome()
        {
            return View();
        }
    }
}

            